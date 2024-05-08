const dayBefore = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
const twoDaysBefore = new Date(new Date().getTime() - 2 * 24 * 60 * 60 * 1000);

export const paymentsHistory = [
    {
        doctor: 'John Doe',
        title: 'Therapy & Consultation',
        payment: 40.15,
        date: new Date()
    },
    {
        doctor: 'Caren Smith',
        title: 'Therapy & Consultation',
        payment: 12.70,
        date: new Date()
    },
    {
        doctor: 'Caren Smith',
        title: 'Therapy & Consultation',
        payment: 99.30,
        date: new Date()
    },
    {
        doctor: 'Elizabeth Jones',
        title: 'Therapy & Consultation',
        payment: 35,
        date: new Date()
    },
    {
        doctor: 'Caren Smith',
        title: 'Therapy & Consultation',
        payment: 12.70,
        date: new Date()
    },
    {
        doctor: 'Caren Smith',
        title: 'Therapy & Consultation',
        payment: 150.95,
        date: new Date()
    },
    {
        doctor: 'Robert Miller',
        title: 'Therapy & Consultation',
        payment: 540,
        date: dayBefore
    },
    {
        doctor: 'Elizabeth Jones',
        title: 'Therapy & Consultation',
        payment: 40.15,
        date: dayBefore
    },
    {
        doctor: 'Elizabeth Jones',
        title: 'Therapy & Consultation',
        payment: 70,
        date: dayBefore
    },
    {
        doctor: 'Samantha Berry',
        title: 'Therapy & Consultation',
        payment: 200,
        date: dayBefore
    },
    {
        doctor: 'Samantha Berry',
        title: 'Therapy & Consultation',
        payment: 80.50,
        date: dayBefore
    },
    {
        doctor: 'Lucas Bell',
        title: 'Therapy & Consultation',
        payment: 50.90,
        date: dayBefore
    },
    {
        doctor: 'Elizabeth Jones',
        title: 'Therapy & Consultation',
        payment: 15,
        date: twoDaysBefore
    },
    {
        doctor: 'Kimbra Lee',
        title: 'Therapy & Consultation',
        payment: 20.90,
        date: twoDaysBefore
    },
    {
        doctor: 'Kimbra Lee',
        title: 'Therapy & Consultation',
        payment: 90.95,
        date: twoDaysBefore
    },
    {
        doctor: 'Robert Miller',
        title: 'Therapy & Consultation',
        payment: 450.87,
        date: twoDaysBefore
    },
    {
        doctor: 'John Doe',
        title: 'Therapy & Consultation',
        payment: 40.15,
        date: twoDaysBefore
    },
    {
        doctor: 'Caren Smith',
        title: 'Therapy & Consultation',
        payment: 12.70,
        date: twoDaysBefore
    },
]