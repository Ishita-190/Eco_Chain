// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create sample facilities
  const facilities = await prisma.facility.createMany({
    data: [
      {
        name: 'GreenCycle Recycling Center',
        address: '123 Eco Street, Delhi, DL 110001',
        ethAddress: '0x1111111111111111111111111111111111111111',
        lat: 28.6139,
        lng: 77.2090,
        phone: '+91 11 1234 5678',
        typesAccepted: ['plastic', 'metal', 'paper'],
        operatingHours: {
          weekdays: '8:00 AM - 6:00 PM',
          weekends: '9:00 AM - 4:00 PM'
        },
        verifiedAt: new Date('2024-01-15')
      },
      {
        name: 'EcoWaste Solutions',
        address: '456 Green Avenue, Delhi, DL 110002',
        ethAddress: '0x2222222222222222222222222222222222222222',
        lat: 28.6239,
        lng: 77.2190,
        phone: '+91 11 8765 4321',
        typesAccepted: ['plastic', 'glass', 'organic'],
        operatingHours: {
          weekdays: '9:00 AM - 5:00 PM',
          weekends: '10:00 AM - 3:00 PM'
        },
        verifiedAt: new Date('2024-01-20')
      },
      {
        name: 'Delhi Waste Management',
        address: '789 Clean Road, Delhi, DL 110003',
        ethAddress: '0x3333333333333333333333333333333333333333',
        lat: 28.6339,
        lng: 77.2290,
        typesAccepted: ['plastic', 'metal', 'paper', 'glass'],
        operatingHours: {
          weekdays: '7:00 AM - 7:00 PM',
          weekends: '8:00 AM - 5:00 PM'
        }
      },
      {
        name: 'RecycleHub Central',
        address: '321 Sustainability Blvd, Delhi, DL 110004',
        ethAddress: '0x4444444444444444444444444444444444444444',
        lat: 28.6439,
        lng: 77.2390,
        phone: '+91 11 5555 0000',
        typesAccepted: ['metal', 'glass', 'paper'],
        operatingHours: {
          weekdays: '8:30 AM - 5:30 PM',
          weekends: '9:00 AM - 2:00 PM'
        },
        verifiedAt: new Date('2024-01-10')
      },
      {
        name: 'Green Earth Processing',
        address: '654 Environmental Way, Delhi, DL 110005',
        ethAddress: '0x5555555555555555555555555555555555555555',
        lat: 28.6539,
        lng: 77.2490,
        phone: '+91 11 9999 1111',
        typesAccepted: ['organic', 'paper', 'plastic'],
        operatingHours: {
          weekdays: '6:00 AM - 8:00 PM',
          weekends: '7:00 AM - 6:00 PM'
        },
        verifiedAt: new Date('2024-01-25')
      }
    ]
  });

  console.log(`Created ${facilities.count} facilities`);
  console.log('✅ Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
