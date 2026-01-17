export interface ExperienceItem {
    company: string;
    role: string;
    period: string;
    description: string;
    logo?: string; // We can add logos later or use placeholders
}

export interface EducationItem {
    school: string;
    degree: string;
    year: string;
}

export const experience: ExperienceItem[] = [
    {
        company: "Partners Banka",
        role: "Founder / CEO",
        period: "01/2022 – Present",
        description: "Building a new-age advisory bank from the ground up. Combining leading technology with personalized advisory services. Obtained banking license and launched operations in 2024."
    },
    {
        company: "Czech Post (Česká pošta)",
        role: "Consultant / Business Development",
        period: "10/2019 – 12/2021",
        description: "Consulting in the area of financial services for the state-owned enterprise operator of postal, logistic, and money transfer services."
    },
    {
        company: "CSOB Bank (KBC Group)",
        role: "Member of the Board of Directors / Transformation",
        period: "03/2017 – 10/2018",
        description: "Led daily banking product lines, IT (DevOps), Digital Channels, Innovations, and Enterprise Architecture. Formulated response to PSD2 and Open Banking. Initiated major regulatory and infrastructure change programs."
    },
    {
        company: "CSOB Bank (KBC Group)",
        role: "Member of the Board of Directors / Specialised Banking & Insurance",
        period: "03/2015 – 03/2017",
        description: "Supervised consumer finance and building savings (CMSS). Accelerated consumer finance market share from 7.3% to 10% while cutting credit costs by 68%."
    },
    {
        company: "CSOB Bank (KBC Group)",
        role: "Member of the Board of Directors / Investments, Markets and Insurance",
        period: "07/2014 – 03/2015",
        description: "Managed Insurance, Asset Management, Pension Funds, FX, and Money & Capital Markets. Developed Omnichannel digital portfolio management platform 'CSOB Investice'."
    },
    {
        company: "CSOB Bank (KBC Group)",
        role: "Member of the Board of Directors / Customer Relationships",
        period: "2013 – 04/2014",
        description: "Managed branch networks (234 branches, 3100 postal outlets). Redesigned operational model for private and SME clients, leading to 14% YoY growth in profits."
    },
    {
        company: "CSOB Bank (KBC Group)",
        role: "Senior Executive Director / Corporate & Institutional Banking",
        period: "2010 – 2012",
        description: "Managed commercial banking for 3000+ corporate clients. Increased market share in corporate lending from 15% to 19%."
    },
    {
        company: "CSOB Bank (KBC Group)",
        role: "Executive Director / Specialized & Institutional Banking",
        period: "2005 – 2010",
        description: "Responsible for Syndications, Project Finance, Real Estate Finance, and Acquisition Finance. Achieved average credit costs below 20 bps despite the global financial crisis."
    },
    {
        company: "CSOB Bank (KBC Group)",
        role: "Director / Restructuring",
        period: "2000 – 2004",
        description: "Managed takeover, restructuring, and liquidation of distressed assets. Prepared restructuring plan accepted by EU Commission."
    }
];

export const education: EducationItem[] = [
    {
        school: "Swiss Banking School",
        degree: "Diploma",
        year: "1999"
    },
    {
        school: "Prague School of Economics",
        degree: "Master’s Degree in Finance, Economics and Data Analytics",
        year: "1996"
    }
];
