export type InvoiceStatus = 'shipped' | 'delivered' | 'pending';

export interface InvoiceItem {
 name: string;
 unitPrice: number;
 units: number;
 totalPrice: number;
}

export interface Invoice {
 id: number;
 billFrom: string;
 billTo: string;
 totalCost: number;
 status: InvoiceStatus;
 orderDate?: Date;
 items?: InvoiceItem[];
}
