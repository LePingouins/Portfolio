import type { WorkExperience } from '../models/WorkExperience';

export const initialWorkExperiences: WorkExperience[] = [
    {
        id: 1,
        title: 'Data Entry Clerk / Office Assistant',
        company: 'Horizon Nature',
        period: '2021 - 2023',
        location: 'Saint-Léonard, Montréal, QC',
        responsibilities: [
            'Entered and verified high-volume data with precision and confidentiality.',
            'Supported daily operations and coordinated document management.'
        ]
    },
    {
        id: 2,
        title: 'Handler',
        company: 'Horizon Nature',
        period: '2019 - 2021',
        location: 'Saint-Léonard, Montréal, QC',
        responsibilities: [
            'Movement, organization, and preparation of materials in a dynamic environment',
            'Maintained accuracy and teamwork in daily tasks',
            'Developed reliability and time management skills'
        ]
    }
];
