# Privacy Policy

**Last Updated:** December 30, 2025

## Introduction

This Privacy Policy explains how Dployr ("we," "us," or "our") collects, uses, and protects your personal data when you use the Dployr platform, website, and related services.

This policy applies to the Dployr platform, website, and related services. **This policy does not cover customer applications or services deployed through Dployr.** Customers are responsible for their own privacy practices regarding their end users.

## Data Controller

Dployr is the data controller for user account data. For data processed on behalf of customers (traffic routed through the proxy), Dployr acts as a data processor and customers are the data controllers.

## Data We Collect

### User Profile Information

We collect user profile information through OAuth authentication providers:

- Email address
- Display name
- Profile picture URL

This information is obtained from Google, GitHub, or Microsoft when you authenticate. **We do not store passwords** as authentication is delegated to these providers.

### Instance and Cluster Data

We collect data that you explicitly provide when configuring your infrastructure:

- Server IP addresses
- Instance names and tags
- Cluster names
- Service names
- Optional metadata

### Agent Telemetry

The dployrd daemon running on your instances sends telemetry data:

- Process snapshots
- Service status
- System health metrics

### Temporary Authentication Data

We generate and store temporary authentication tokens:

- Session tokens (7 day expiry)
- OAuth state tokens (10 minute expiry)
- One-time passwords (10 minute expiry)

### Event Logs

We maintain event logs for audit purposes:

- Action types
- Actor identifiers
- Target identifiers
- Timestamps

## Lawful Basis for Processing

**Contract Performance:** Processing account data, instance data, and telemetry is necessary to provide the Dployr service.

**Legitimate Interest:** Processing event logs for security and audit purposes.

## Third-Party Services

### Cloudflare

Cloudflare provides DNS, traffic routing, and access control. Cloudflare may collect IP addresses and network data under their privacy policy at [cloudflare.com/privacypolicy](https://www.cloudflare.com/privacypolicy/).

### OAuth Providers

Google, GitHub, and Microsoft handle authentication. Only profile information authorized by you during OAuth consent is shared with Dployr.

### Stripe

Stripe processes subscription payments. **Dployr does not receive or store payment card numbers.** Stripe's privacy policy governs payment data at [stripe.com/privacy](https://stripe.com/privacy).

## Data Retention

We retain data for the following periods:

- **Session tokens:** 7 days, then automatically deleted
- **OAuth state tokens:** 10 minutes, then automatically deleted
- **One-time passwords:** 10 minutes, then automatically deleted
- **Event logs:** 90 days, then automatically deleted
- **Process snapshots:** 24 hours, then automatically deleted
- **Account and instance data:** Retained while your account is active, deleted upon account deletion request

## International Data Transfers

Data may be processed in countries outside the European Economic Area. Transfers are protected by standard contractual clauses and adequacy decisions where applicable. Cloudflare and Stripe maintain their own transfer mechanisms compliant with EU requirements.

## Your Rights (EU Users)

If you are located in the European Union, you have the following rights:

- **Right to access:** Request a copy of personal data held about you
- **Right to rectification:** Request correction of inaccurate personal data
- **Right to erasure:** Request deletion of personal data
- **Right to data portability:** Receive personal data in a structured, machine-readable format
- **Right to object:** Object to processing based on legitimate interest
- **Right to restrict processing:** Request limitation of processing in certain circumstances
- **Right to withdraw consent:** Where processing is based on consent, withdraw at any time

To exercise these rights, contact us at the email address provided below. We will fulfill requests within 30 days. If you are unsatisfied with our response, you may lodge a complaint with your local data protection authority.

## Data Export

You may request an export of all personal data associated with your account. The export includes profile information, cluster memberships, instances, services, and event logs in JSON format.

## Account Deletion

You may delete your account at any time through the platform or by contacting us. Deletion removes all associated personal data from active systems. Backup retention may extend up to 30 days after deletion, after which data is permanently removed.

## Customer Services Disclaimer

**Dployr routes traffic to services deployed by customers. This privacy policy does not cover customer applications or their end users.**

Customers are responsible for:

- Maintaining their own privacy policies
- Obtaining necessary consents from their end users
- Complying with applicable data protection laws

A Data Processing Addendum is available for customers requiring contractual assurances regarding data processing.

## Children

Dployr is not intended for children under 13. We do not knowingly collect personal data from children under 13. If we become aware that we have collected personal data from a child under 13, we will delete it promptly.

## Security

We implement appropriate security measures to protect your data:

- Data is encrypted in transit using TLS
- Authentication uses industry-standard OAuth protocols
- Access to production systems is restricted to authorized personnel
- We maintain security practices appropriate to the nature of the data processed

## Breach Notification

In the event of a personal data breach affecting EU users, we will notify the relevant supervisory authority within 72 hours where required. Affected users will be notified without undue delay if the breach poses a high risk to their rights and freedoms.

## Changes to This Policy

We may update this policy from time to time. Material changes will be communicated via email or dashboard notification at least 30 days before taking effect. Continued use after changes take effect constitutes acceptance.

## Contact

For privacy inquiries and data subject requests, please contact us at:

**Email:** [privacy@dployr.io]

---

*This privacy policy is designed to comply with the General Data Protection Regulation (GDPR) and other applicable data protection laws.*
