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
      image: 'News_recommend_system.png'
    },
    {
      id: 3,
      title: 'InsightHive',
      description: '[Project description placeholder - Describe your data science project, the problem it solves, and key results]',
      tags: ['GNN', 'Bert', 'K-means', 'Supabase'],
      github: '[Your GitHub Link]',
      demo: '[Your Demo Link]',
      image: 'InsightHive.png'
    },

  ]);

  skills = signal([
    {
      name: 'Programming Languages',
      items: [
        { name: 'Python', icon: 'python' },
        { name: 'R', icon: 'r' },
        { name: 'SQL', icon: 'mysql' },
        { name: 'JavaScript', icon: 'javascript' }
      ]
    },
    {
      name: 'Machine Learning',
      items: [
        { name: 'Scikit-learn', icon: 'scikitlearn' },
        { name: 'TensorFlow', icon: 'tensorflow' },
        { name: 'PyTorch', icon: 'pytorch' }
      ]
    },
    {
      name: 'Data Tools',
      items: [
        { name: 'Pandas', icon: 'pandas' },
        { name: 'NumPy', icon: 'numpy' },
        { name: 'Matplotlib', icon: 'matplotlib' },
        { name: 'Seaborn', icon: 'seaborn' }
      ]
    },
    {
      name: 'Big Data & Cloud',
      items: [
        { name: 'AWS', icon: 'amazonwebservices' },
        { name: 'Docker', icon: 'docker' },
        { name: 'Kubernetes', icon: 'kubernetes' }
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

  getIconUrl(iconName: string, useSimpleIcons: boolean = false, useSkillIcons: boolean = false): string {
    if (useSkillIcons) {
      // Use Simple Icons CDN directly for AWS and Matplotlib
      // Website: https://simpleicons.org/
      // Format: https://cdn.simpleicons.org/{icon-name}/{color}
      if (iconName === 'aws') {
        return 'https://cdn.simpleicons.org/amazonaws/FF9900'; // AWS orange
      }
      if (iconName === 'matplotlib') {
        return 'https://cdn.simpleicons.org/matplotlib/11557c'; // Matplotlib blue
      }
      // Fallback to skillicons.dev
      return `https://skillicons.dev/icons?i=${iconName}`;
    }
    if (useSimpleIcons) {
      // Use Simple Icons CDN directly (more reliable than Iconify)
      // Website: https://simpleicons.org/
      const color = this.getIconColor(iconName);
      return `https://cdn.simpleicons.org/${iconName}/${color}`;
    }
    // Using DevIcons CDN - returns colored SVG icons
    // Website: https://devicon.dev/
    return `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${iconName}/${iconName}-original.svg`;
  }

  getIconColor(iconName: string): string {
    // Color codes for Simple Icons (hex without #)
    const colors: { [key: string]: string } = {
      'pandas': '150458', // Pandas blue
      'numpy': '013243', // NumPy blue
      'matplotlib': '11557c', // Matplotlib blue
      'seaborn': '3776ab', // Python blue (Seaborn doesn't have official color)
      'scikitlearn': 'f7931e' // Orange
    };
    return colors[iconName] || '3776ab'; // Default to Python blue
  }

  getIconName(skillName: string, icon?: string): { name: string; useSimpleIcons: boolean; useSkillIcons: boolean } {
    // Return the icon name if provided
    if (icon) {
      // Check which icon source to use
      const simpleIconsList = ['pandas', 'numpy', 'seaborn', 'scikitlearn'];
      const skillIconsList = ['aws', 'matplotlib'];
      const iconLower = icon.toLowerCase();

      return {
        name: icon,
        useSimpleIcons: simpleIconsList.includes(iconLower),
        useSkillIcons: skillIconsList.includes(iconLower)
      };
    }

    // Icon mapping with source preference
    const iconMap: { [key: string]: { name: string; useSimpleIcons: boolean; useSkillIcons: boolean } } = {
      'Python': { name: 'python', useSimpleIcons: false, useSkillIcons: false },
      'R': { name: 'r', useSimpleIcons: false, useSkillIcons: false },
      'SQL': { name: 'mysql', useSimpleIcons: false, useSkillIcons: false },
      'JavaScript': { name: 'javascript', useSimpleIcons: false, useSkillIcons: false },
      'Scikit-learn': { name: 'scikitlearn', useSimpleIcons: true, useSkillIcons: false },
      'TensorFlow': { name: 'tensorflow', useSimpleIcons: false, useSkillIcons: false },
      'PyTorch': { name: 'pytorch', useSimpleIcons: false, useSkillIcons: false },
      'Pandas': { name: 'pandas', useSimpleIcons: true, useSkillIcons: false },
      'NumPy': { name: 'numpy', useSimpleIcons: true, useSkillIcons: false },
      'Matplotlib': { name: 'matplotlib', useSimpleIcons: false, useSkillIcons: true },
      'Seaborn': { name: 'seaborn', useSimpleIcons: true, useSkillIcons: false },
      'AWS': { name: 'amazonaws', useSimpleIcons: false, useSkillIcons: true },
      'Docker': { name: 'docker', useSimpleIcons: false, useSkillIcons: false },
      'Kubernetes': { name: 'kubernetes', useSimpleIcons: false, useSkillIcons: false }
    };

    const mapping = iconMap[skillName];
    if (mapping) {
      return mapping;
    }

    // Fallback
    const fallbackName = skillName.toLowerCase().replace(/\s+/g, '');
    return { name: fallbackName, useSimpleIcons: false, useSkillIcons: false };
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
