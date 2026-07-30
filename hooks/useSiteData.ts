// ============================================================
// useSiteData — Single source of truth for all site-wide data.
// To update contact info, social links, or map URL, edit here.
// ============================================================

export const SITE_DATA = {
    contact: {
        email: "info@nexora-solutions.co",
        phone: "+20 111 718 0818",
        whatsapp: "https://wa.me/201117180818",
        address: "1 Mustafa El-Nahas, intersection with Abbas El-Akkad, Nasr City",
        shortAddress: "1 Mustafa El-Nahas, intersection with Abbas El-Akkad, Nasr City",
        responseTime: "15 mins",
        workingHours: "Sat - Thu, 9:00 AM - 5:00 PM"
    },
    social: {
        facebook: "https://web.facebook.com/NexoraSolutionsEg",
        instagram: "https://www.instagram.com/nexora.solutions.eg?igsh=OXp1eWRta3pveXhm&utm_source=qr",
        linkedin: "https://www.linkedin.com/company/nexora-solutions-co/"
    },
    map: {
        embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3453.434972111121!2d31.3389006!3d30.053064!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583f00024ce5f9%3A0x6c35b3f36d15e86b!2sNexora%20Solutions!5e0!3m2!1sen!2seg!4v1785267390442!5m2!1sen!2seg",
        linkUrl: "https://maps.app.goo.gl/sveAc9g5PgNTHrvj6?g_st=iwb"
    }
} as const;

/** Hook wrapper — works in both Server and Client components */
export function useSiteData() {
    return SITE_DATA;
}
