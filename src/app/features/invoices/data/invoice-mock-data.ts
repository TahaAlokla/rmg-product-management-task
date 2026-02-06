import type { Invoice } from '../models/invoice';

export const MOCK_INVOICES: Invoice[] = [
 {
  id: 101,
  billFrom: 'Pineapple Inc.',
  billTo: 'Reels Inc.',
  totalCost: 90,
  status: 'shipped',
  items: [
   { name: 'Web Development', unitPrice: 45, units: 2, totalPrice: 90 }
  ]
 },
 {
  id: 102,
  billFrom: 'Pineapple',
  billTo: 'MF Inc.',
  totalCost: 90,
  status: 'delivered',
  items: [
   { name: 'Consulting Services', unitPrice: 90, units: 1, totalPrice: 90 }
  ]
 },
 {
  id: 103,
  billFrom: 'Incorporation.',
  billTo: 'Reelwood.',
  totalCost: 90,
  status: 'pending',
  items: [
   { name: 'Design Work', unitPrice: 30, units: 3, totalPrice: 90 }
  ]
 },
 {
  id: 104,
  billFrom: 'PineappleTimes',
  billTo: 'RFI.',
  totalCost: 90,
  status: 'shipped',
  items: [
   { name: 'Marketing Campaign', unitPrice: 45, units: 2, totalPrice: 90 }
  ]
 },
 {
  id: 105,
  billFrom: 'Fortune Creation',
  billTo: 'Soft solution.',
  totalCost: 90,
  status: 'delivered',
  items: [
   { name: 'Software License', unitPrice: 90, units: 1, totalPrice: 90 }
  ]
 },
 {
  id: 106,
  billFrom: 'Tech Solutions Ltd.',
  billTo: 'Digital Corp.',
  totalCost: 150,
  status: 'shipped',
  items: [
   { name: 'Server Setup', unitPrice: 100, units: 1, totalPrice: 100 },
   { name: 'Configuration', unitPrice: 50, units: 1, totalPrice: 50 }
  ]
 },
 {
  id: 107,
  billFrom: 'Global Industries',
  billTo: 'Metro Systems',
  totalCost: 200,
  status: 'pending',
  items: [
   { name: 'Project Management', unitPrice: 100, units: 2, totalPrice: 200 }
  ]
 },
 {
  id: 108,
  billFrom: 'Creative Studios',
  billTo: 'Brand Agency',
  totalCost: 120,
  status: 'delivered',
  items: [
   { name: 'Logo Design', unitPrice: 60, units: 2, totalPrice: 120 }
  ]
 },
 {
  id: 109,
  billFrom: 'Innovation Labs',
  billTo: 'Future Tech',
  totalCost: 175,
  status: 'shipped',
  items: [
   { name: 'Research & Development', unitPrice: 175, units: 1, totalPrice: 175 }
  ]
 },
 {
  id: 110,
  billFrom: 'Smart Enterprises',
  billTo: 'Cloud Services',
  totalCost: 95,
  status: 'pending',
  items: [
   { name: 'Cloud Migration', unitPrice: 95, units: 1, totalPrice: 95 }
  ]
 }
];
