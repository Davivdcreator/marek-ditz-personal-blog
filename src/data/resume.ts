export interface ExperienceItem {
    company: string;
    role: string;
    period: string;
    description: string;
    achievements?: string[];
    logo?: string;
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
        description: "Building a new-age advisory bank from the ground up. Combining leading technology with personalized advisory services. Obtained banking license and launched operations in 2024.",
        achievements: [
            "Led team of technical and business professionals successfully applying for a new banking license in Czech Republic.",
            "Started a digital neobank complementing the established network of financial advisors.",
            "Implemented first bank in Czech Republic 100% based in cloud and on recent technologies (2020/4)."
        ]
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
        description: "Led daily banking product lines, IT (DevOps), Digital Channels, Innovations, and Enterprise Architecture. Formulated response to PSD2 and Open Banking.",
        achievements: [
            "Formulated distinctive Open Bankinsurance strategy forming the largest multiproduct digital comparator group in CZ (Usetreno.cz, Top-pojisteni.cz) growing above 50% YoY.",
            "Coordinated group-wide transformational programs: robotization (RPA), simplification & IT cost savings, BusDevOps formation.",
            "Led innovation initiatives (Innovation accelerator) and projects like MIFID, PRIIPS, O365.",
            "Formed and sponsored BI and data analytic activities."
        ]
    },
    {
        company: "CSOB Bank (KBC Group)",
        role: "Member of the Board of Directors / Specialised Banking & Insurance",
        period: "03/2015 – 03/2017",
        description: "Supervised consumer finance and building savings (CMSS). Accelerated consumer finance market share from 7.3% to 10% while cutting credit costs by 68%.",
        achievements: [
            "Accelerated consumer finance from 7.3 to 10% of Czech market while cutting credit costs by 68%.",
            "Proactive management of cost of funds of building savings in low interest rate environment.",
            "Introduction of CSOB Insurance to CMSS (2016)."
        ]
    },
    {
        company: "CSOB Bank (KBC Group)",
        role: "Member of the Board of Directors / Investments, Markets and Insurance",
        period: "07/2014 – 03/2015",
        description: "Managed Insurance, Asset Management, Pension Funds, FX, and Money & Capital Markets. Developed Omnichannel digital portfolio management platform 'CSOB Investice'.",
        achievements: [
            "Development of multiproduct omnichannel digital portfolio management platform CSOB Investice.",
            "Sponsorship of Insurance expansion (from 6.4 to 7.5% of CZ market) and new partnership sales channels."
        ]
    },
    {
        company: "CSOB Bank (KBC Group)",
        role: "Member of the Board of Directors / Customer Relationships",
        period: "2013 – 04/2014",
        description: "Managed branch networks (234 branches, 3100 postal outlets). Redesigned operational model for private and SME clients.",
        achievements: [
            "Initiated restructuring of retail, SME and private banking operations.",
            "Introduced relationship management for affluent clients and new motivation system leading to increased profitability (14% YoY).",
            "Re-introduced bankinsurance concept with full insurance product range (sales doubled YoY in 1Q14).",
            "Designed advanced scheme of asset and liability pricing and liquidity management."
        ]
    },
    {
        company: "CSOB Bank (KBC Group)",
        role: "Senior Executive Director / Corporate & Institutional Banking",
        period: "2010 – 2012",
        description: "Managed commercial banking for 3000+ corporate clients. Increased market share in corporate lending from 15% to 19%.",
        achievements: [
            "Developed competitive system of sales planning, target setting and performance management.",
            "Exceeded all sales and customer acquisition targets on annual basis.",
            "Increased market share in corporate lending from 15% to 19%.",
            "Helped to shape corporate credit risk acceptance policy resulting in lowest credit costs among peers."
        ]
    },
    {
        company: "CSOB Bank (KBC Group)",
        role: "Executive Director / Specialized & Institutional Banking",
        period: "2005 – 2010",
        description: "Responsible for Syndications, Project Finance, Real Estate Finance, and Acquisition Finance.",
        achievements: [
            "Introduced and developed sales of specialized finance solutions (acquisition, real estate, project, trade finance).",
            "Achieved annual profits over €64m in 2012 (from €5m in 2004) while keeping average credit cost below 20 bps.",
            "Managed group strategic projects (financial services to Czech road tolling system).",
            "Successfully coordinated negotiations of key commercial partnership contracts (banking joint venture with Czech Post)."
        ]
    },
    {
        company: "CSOB Bank (KBC Group)",
        role: "Director / Restructuring",
        period: "2000 – 2004",
        description: "Managed takeover, restructuring, and liquidation of distressed assets. Prepared restructuring plan accepted by EU Commission.",
        achievements: [
            "Established dedicated restructuring unit to manage and liquidate distressed corporate assets and investments worth €800m.",
            "Managed preparation of restructuring plan accepted by EU Commission (2003-4)."
        ]
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
