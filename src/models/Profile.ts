import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    bio: {
      type: String,
      trim: true,
      default: '',
    },
    linkedinUrl: {
      type: String,
      trim: true,
      default: '',
    },
    githubUrl: {
      type: String,
      trim: true,
      default: '',
    },
    email: {
      type: String,
      trim: true,
      default: '',
    },
    available: {
      type: Boolean,
      default: true,
    },
    portfolioUrl: {
      type: String,
      trim: true,
      default: 'https://www.shivamshankhdhar.online',
    },
    appsUrl: {
      type: String,
      trim: true,
      default: 'https://www.apps.shivamshankhdhar.online',
    },
    adminUrl: {
      type: String,
      trim: true,
      default: 'https://www.admin.shivamshankhdhar.online',
    },
    roles: {
      type: [String],
      default: [
        'Full Stack Developer',
        'Java Developer',
        'MERN Stack Developer',
        'React Native Developer',
      ],
    },
    yearsExperience: {
      type: String,
      trim: true,
      default: '3+',
    },
    projectsCompleted: {
      type: String,
      trim: true,
      default: '20+',
    },
    happyClients: {
      type: String,
      trim: true,
      default: '100%',
    },
    headlineQuote: {
      type: String,
      trim: true,
      default:
        'Engineering is not merely writing code to make things work; it is designing resilient architectures that endure under load and craft experiences users love.',
    },
    location: {
      type: String,
      trim: true,
      default: 'Bareilly, Uttar Pradesh, India',
    },
    phone: {
      type: String,
      trim: true,
      default: '+91 8448967919',
    },
  },
  { timestamps: true }
);

export default mongoose.models.Profile || mongoose.model('Profile', profileSchema, 'profile');
