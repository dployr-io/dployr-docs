# Data Processing Addendum

**Last Updated:** December 30, 2025

## Introduction

This Data Processing Addendum ("DPA") forms part of the agreement between Dployr and the customer. It applies when Dployr processes personal data on behalf of the customer.

For the purposes of this DPA:

- **Customer** is the data controller
- **Dployr** is the data processor
- **End user data** routed through the platform is subject to this DPA

## Definitions

**Personal data:** Any information relating to an identified or identifiable natural person.

**Data subject:** The individual whose personal data is processed.

**Processing:** Any operation performed on personal data, including collection, recording, organization, structuring, storage, adaptation, retrieval, consultation, use, disclosure, transmission, or deletion.

**Sub-processor:** A third party engaged by Dployr to process personal data on behalf of the customer.

**Supervisory authority:** The relevant data protection authority in the customer's jurisdiction.

**GDPR:** Regulation (EU) 2016/679 of the European Parliament and of the Council.

## Scope of Processing

Dployr processes personal data solely to provide the traffic routing service. Processing activities include:

- Receiving HTTP requests from end users
- Forwarding requests to customer instances
- Returning responses to end users

**Dployr does not store request bodies or end user personal data beyond what is necessary for immediate request handling.** Processing occurs for the duration of the service agreement.

## Categories of Data Subjects

End users of customer services who access those services through Dployr's traffic routing.

## Categories of Personal Data

Data contained in HTTP requests routed through Dployr, which may include:

- IP addresses
- Request headers
- Request bodies

**The specific categories of personal data are determined by the customer's application, not by Dployr.** Customers control what data is transmitted through the platform.

## Customer Obligations

Customer warrants:

- They have a lawful basis to process end user personal data
- They have provided appropriate privacy notices to end users
- They have obtained necessary consents where required by applicable law

Customer agrees:

- Not to instruct Dployr to process data in violation of applicable law
- To ensure their use of Dployr complies with data protection regulations

## Dployr Obligations

Dployr agrees to:

- **Process personal data only on documented customer instructions**
- **Ensure personnel authorized to process personal data are bound by confidentiality obligations**
- **Implement appropriate technical and organizational security measures** as described in this DPA
- **Not engage sub-processors without customer authorization**
- **Assist customer in responding to data subject requests** to the extent technically feasible
- **Assist customer in ensuring compliance with breach notification obligations**
- **Delete or return personal data upon termination of services**, at customer's choice
- **Make available information necessary to demonstrate compliance** with processor obligations under GDPR

## Security Measures

Dployr implements the following security measures:

- **Encryption in transit:** All traffic routing uses TLS encryption
- **Access controls:** Personnel access to production systems is restricted to authorized personnel
- **Authentication:** Platform access uses industry-standard OAuth protocols
- **DDoS protection:** Cloudflare provides DDoS mitigation and network security

## Sub-processors

Dployr uses the following sub-processor:

- **Cloudflare Inc.** (United States): DNS, traffic routing, DDoS protection, and access control

Customer authorizes the use of this sub-processor. Dployr will notify customers of changes to sub-processors with 30 days notice. Customers may object to new sub-processors within 14 days of notification. If an objection cannot be resolved, the customer may terminate the affected services without penalty.

## International Transfers

Personal data may be transferred outside the European Economic Area. Transfers to Cloudflare are covered by Cloudflare's own data processing addendum and standard contractual clauses. Dployr will ensure appropriate transfer mechanisms are in place for any sub-processor processing EU personal data.

## Data Subject Requests

If Dployr receives a request from a data subject regarding customer data, Dployr will:

- Redirect the data subject to the customer
- Notify the customer of the request within 5 business days
- Assist the customer in responding to the request to the extent technically feasible

Customers are responsible for responding to data subject requests within the timeframes required by applicable law.

## Data Breach Notification

Dployr will notify the customer of any personal data breach without undue delay after becoming aware. Notification will include:

- The nature of the breach
- Categories of data affected
- Approximate number of data subjects affected
- Measures taken or proposed to address the breach

Dployr will cooperate with the customer in investigating and mitigating the breach.

## Audits

Upon customer request with reasonable notice, Dployr will:

- Provide information necessary to demonstrate compliance with processor obligations
- Allow for and contribute to audits conducted by the customer or an appointed auditor, subject to confidentiality obligations

Audit costs are borne by the customer unless the audit reveals material non-compliance by Dployr.

## Term and Termination

This DPA remains in effect for the duration of the service agreement. Upon termination:

- Dployr will delete customer personal data within 30 days unless retention is required by law
- Customer may request data return prior to deletion

## Liability

Liability under this DPA is subject to the limitations in the main service agreement. Each party is liable for damages caused by processing that violates GDPR or this DPA.

## Governing Law

This DPA is governed by the same law as the main service agreement. For EU customers, GDPR applies regardless of the governing law specified in the main agreement.

---

*This Data Processing Addendum is designed to comply with the General Data Protection Regulation (GDPR) and other applicable data protection laws.*
