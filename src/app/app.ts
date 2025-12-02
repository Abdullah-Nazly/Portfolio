import { Component, signal, effect, HostListener } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { FormsModule } from '@angular/forms';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate('800ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('fadeInLeft', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-30px)' }),
        animate('800ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
      ])
    ]),
    trigger('fadeInRight', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(30px)' }),
        animate('800ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
      ])
    ])
  ]
})
export class App {
  protected readonly title = signal('Portfolio');
  isScrolled = signal(false);
  isMenuOpen = signal(false);
  isDarkMode = signal(true); // Default to dark mode

  // Contact form properties
  contactForm = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };
  isSubmitting = signal(false);
  submitMessage = signal('');
  submitSuccess = signal(false);

  constructor() {
    // Check for saved theme preference or default to dark mode
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      this.isDarkMode.set(false);
      document.documentElement.classList.remove('dark-mode');
    } else {
      // Default to dark mode if no preference is saved
      this.isDarkMode.set(true);
      document.documentElement.classList.add('dark-mode');
    }
  }

  projects = signal([
    {
      id: 1,
      title: 'Mawanella Motors',
      description: 'A web application for Mawanella Motors, a bike spare parts and accessories store.',
      tags: ['Angular', 'Laravel'],
      github: '[Your GitHub Link]',
      demo: '[Your Demo Link]',
      image: 'mawanella-motors.png'
    },
    {
      id: 2,
      title: 'News Recommendation System',
      description: 'A news recommendation system using with javafx as ui framework. A simple NLP based news recommendation system.',
      tags: ['Java', 'JavaFX', 'NLP', 'MongoDB'],
      github: 'https://github.com/Abdullah-Nazly/Bank-Subscription-Prediction',
      demo: null,
      image: 'project2.jpg'
    },
    {
      id: 3,
      title: '[Project Title 3]',
      description: '[Project description placeholder - Describe your data science project, the problem it solves, and key results]',
      tags: ['R', 'Statistical Analysis', 'Visualization'],
      github: '[Your GitHub Link]',
      demo: '[Your Demo Link]',
      image: 'project3.jpg'
    },
    {
      id: 4,
      title: '[Project Title 4]',
      description: '[Project description placeholder - Describe your data science project, the problem it solves, and key results]',
      tags: ['PyTorch', 'Computer Vision', 'Data Pipeline'],
      github: '[Your GitHub Link]',
      demo: null,
      image: 'project4.jpg'
    },
    {
      id: 5,
      title: '[Project Title 5]',
      description: '[Project description placeholder - Describe your data science project, the problem it solves, and key results]',
      tags: ['SQL', 'Big Data', 'ETL'],
      github: '[Your GitHub Link]',
      demo: '[Your Demo Link]',
      image: 'project5.jpg'
    },
    {
      id: 6,
      title: '[Project Title 6]',
      description: '[Project description placeholder - Describe your data science project, the problem it solves, and key results]',
      tags: ['Scikit-learn', 'Feature Engineering', 'Model Deployment'],
      github: '[Your GitHub Link]',
      demo: null,
      image: 'project6.jpg'
    }
  ]);

  skills = signal([
    {
      name: 'Programming Languages',
      items: [
        { name: 'Python', level: 90, icon: 'python' },
        { name: 'R', level: 85, icon: 'r' },
        { name: 'SQL', level: 88, icon: 'mysql' },
        { name: 'JavaScript', level: 70, icon: 'javascript' }
      ]
    },
    {
      name: 'Machine Learning',
      items: [
        { name: 'Scikit-learn', level: 92, icon: 'scikitlearn' },
        { name: 'TensorFlow', level: 85, icon: 'tensorflow' },
        { name: 'PyTorch', level: 80, icon: 'pytorch' },
        { name: 'XGBoost', level: 88, icon: 'xgboost' }
      ]
    },
    {
      name: 'Data Tools',
      items: [
        { name: 'Pandas', level: 95, icon: 'pandas' },
        { name: 'NumPy', level: 90, icon: 'numpy' },
        { name: 'Matplotlib', level: 85, icon: 'matplotlib' },
        { name: 'Seaborn', level: 87, icon: 'seaborn' }
      ]
    },
    {
      name: 'Big Data & Cloud',
      items: [
        { name: 'Spark', level: 75, icon: 'apachespark' },
        { name: 'AWS', level: 80, icon: 'amazonaws' },
        { name: 'Docker', level: 78, icon: 'docker' },
        { name: 'Kubernetes', level: 70, icon: 'kubernetes' }
      ]
    }
  ]);

  getAssetPath(path: string): string {
    // Get the base href from the document (handles /Portfolio/ for GitHub Pages)
    const baseHref = document.querySelector('base')?.getAttribute('href') || '/';
    // Remove trailing slash from baseHref if present, then add the asset path
    const cleanBase = baseHref.endsWith('/') ? baseHref.slice(0, -1) : baseHref;
    const cleanPath = path.startsWith('/') ? path : '/' + path;
    return cleanBase + cleanPath;
  }

  getIconUrl(iconName: string): string {
    // Using Simple Icons CDN - returns SVG icon URL
    return `https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/${iconName}.svg`;
  }

  getIconName(skillName: string, icon?: string): string {
    // Return the icon name if provided, otherwise try to derive from skill name
    if (icon) return icon;

    // Fallback mapping for common skills
    const iconMap: { [key: string]: string } = {
      'Python': 'python',
      'R': 'r',
      'SQL': 'mysql',
      'JavaScript': 'javascript',
      'Scikit-learn': 'scikitlearn',
      'TensorFlow': 'tensorflow',
      'PyTorch': 'pytorch',
      'XGBoost': 'xgboost',
      'Pandas': 'pandas',
      'NumPy': 'numpy',
      'Matplotlib': 'matplotlib',
      'Seaborn': 'seaborn',
      'Spark': 'apachespark',
      'AWS': 'amazonaws',
      'Docker': 'docker',
      'Kubernetes': 'kubernetes'
    };

    return iconMap[skillName] || 'circle';
  }

  handleIconError(event: Event) {
    const img = event.target as HTMLImageElement;
    if (img) {
      img.style.display = 'none';
      const fallback = img.nextElementSibling as HTMLElement;
      if (fallback) {
        fallback.style.display = 'block';
      }
    }
  }

  handleProfileImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    if (img) {
      img.style.display = 'none';
      const placeholder = img.nextElementSibling as HTMLElement;
      if (placeholder) {
        placeholder.style.display = 'block';
      }
    }
  }

  handleProjectImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    if (img) {
      img.style.display = 'none';
      const placeholder = img.parentElement?.querySelector('.project-placeholder') as HTMLElement;
      if (placeholder) {
        placeholder.style.display = 'flex';
      }
    }
  }

  @HostListener('window:scroll')
  onScroll() {
    this.isScrolled.set(window.scrollY > 50);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    // Don't close if clicking on hamburger or menu items
    if (target.closest('.hamburger') || target.closest('.nav-menu')) {
      return;
    }
    // Close menu if clicking outside
    if (this.isMenuOpen()) {
      this.isMenuOpen.set(false);
    }
  }

  scrollTo(elementId: string) {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    // Close mobile menu after clicking a link
    this.isMenuOpen.set(false);
  }

  toggleMenu(event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    this.isMenuOpen.set(!this.isMenuOpen());
  }

  toggleDarkMode() {
    this.isDarkMode.set(!this.isDarkMode());
    if (this.isDarkMode()) {
      document.documentElement.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    }
  }

  downloadCV() {
    // Placeholder for CV download functionality
    // You'll need to add your CV file to the assets folder
    const link = document.createElement('a');
    link.href = this.getAssetPath('/assets/CV.pdf'); // Update this path to your CV file
    link.download = 'CV.pdf';
    link.click();
  }

  async onSubmit(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;

    // Validate form
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    this.isSubmitting.set(true);
    this.submitMessage.set('');
    this.submitSuccess.set(false);

    try {
      // EmailJS configuration
      // See EMAILJS_SETUP.md for setup instructions
      // Get these values from: https://www.emailjs.com/
      const serviceId = 'service_6pdekwd';
      const templateId = 'template_3m30a5j';
      const publicKey = 'wTWaweBZHdjwVhmQS';

      const templateParams = {
        name: this.contactForm.name,
        email: this.contactForm.email,
        subject: this.contactForm.subject,
        message: this.contactForm.message,
        time: new Date().toLocaleString('en-US', {
          weekday: 'short',
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        to_email: 'abdullahibnunazly@gmail.com'
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);

      this.submitSuccess.set(true);
      this.submitMessage.set('Thank you for your message! I will get back to you soon.');

      // Reset form
      this.contactForm = {
        name: '',
        email: '',
        subject: '',
        message: ''
      };
      form.reset();

      // Clear success message after 5 seconds
      setTimeout(() => {
        this.submitMessage.set('');
        this.submitSuccess.set(false);
      }, 5000);

    } catch (error) {
      console.error('Email sending failed:', error);
      this.submitSuccess.set(false);
      this.submitMessage.set('Sorry, there was an error sending your message. Please try again or contact me directly at abdullahibnunazly@gmail.com');
    } finally {
      this.isSubmitting.set(false);
    }
  }
}
