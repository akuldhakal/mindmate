/**
 * NEPAL SUPPORT & HELP DIRECTORY
 * 
 * Verified national and public support contacts for students and young people in Nepal.
 * Only verified official contacts and websites are included.
 */

export interface NepalEmergencyContact {
  id: string;
  name: string;
  category: 'emergency' | 'child-young-person' | 'psychosocial';
  categoryLabel: string;
  phone?: string;
  telLink?: string;
  website?: string;
  description: string;
  isImmediateEmergency?: boolean;
}

export const NEPAL_SUPPORT_DIRECTORY: NepalEmergencyContact[] = [
  {
    id: 'nepal-police',
    name: 'Nepal Police — Emergency',
    category: 'emergency',
    categoryLabel: 'Immediate Emergency',
    phone: '100',
    telLink: 'tel:100',
    description: 'For immediate police assistance in an emergency.',
    isImmediateEmergency: true
  },
  {
    id: 'child-helpline',
    name: 'Child Helpline Nepal',
    category: 'child-young-person',
    categoryLabel: 'Child & Young Person Support',
    phone: '1098',
    telLink: 'tel:1098',
    description: 'Free child-protection helpline for children and young people who may need protection, counseling, rescue, or other support.',
    isImmediateEmergency: false
  },
  {
    id: 'ncrc',
    name: 'National Child Rights Council',
    category: 'child-young-person',
    categoryLabel: 'Child & Young Person Support',
    website: 'https://ncrc.gov.np/',
    description: 'Government body responsible for child-rights protection and related services in Nepal.',
    isImmediateEmergency: false
  },
  {
    id: 'cwin-nepal',
    name: 'Child Workers in Nepal Concerned Centre (CWIN-Nepal)',
    category: 'psychosocial',
    categoryLabel: 'Child & Psychosocial Support',
    website: 'https://cwin.org.np/',
    description: 'Child-rights organization providing child protection, Child Helpline 1098 services, psychosocial support, and related assistance.',
    isImmediateEmergency: false
  }
];

export const TRUSTED_PEOPLE_LIST = [
  {
    title: 'A Trusted Friend',
    desc: 'Share how you are feeling in a quiet, private moment. Often just saying it out loud brings relief.'
  },
  {
    title: 'Family Member',
    desc: 'A parent, sibling, or relative who cares for your wellbeing and can listen with patience.'
  },
  {
    title: 'Teacher or Lecturer',
    desc: 'An educator or department teacher you feel comfortable approaching for academic or personal advice.'
  },
  {
    title: 'Faculty Mentor or Advisor',
    desc: 'A college mentor assigned to guide students through challenges and institutional support.'
  },
  {
    title: 'Trusted Adult in Your Community',
    desc: 'A respected mentor, elder, or community counselor who can offer safe, sensible guidance.'
  }
];
