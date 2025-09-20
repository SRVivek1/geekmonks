---
title: Security Groups & Ports
permalink: cloud/aws/_topics/t5-security-groups-and-classic-ports.md
layout: course-content
date: Septemper 19, 2025
---

## Concept Overview

* A **Security Group** acts as a virtual firewall for your Amazon EC2 instances to control inbound and outbound traffic. 
* From an architect's standpoint, it is the initial and most crucial layer of network security for instances, functioning as a gatekeeper to define what traffic is permitted to reach or leave them. 
* It's important to remember that it **operates at the instance level**, not the subnet level.

-----

## Detailed Explanation

* Security Groups are a core component of the AWS security model. 
* They are **stateful**, which is a key characteristic. This means that if you allow inbound traffic on a specific port, the return outbound traffic is automatically allowed, regardless of any outbound rules. 
* Conversely, if you allow outbound traffic, the corresponding inbound traffic is also automatically allowed.


### Key principles to remember:

  * **Default Deny:** 
    * A Security Group implicitly denies all inbound traffic. 
    * You must explicitly create rules to allow any traffic in.
  * **Allow-Only Rules:** 
    * You can only create rules that allow traffic; you cannot create rules to explicitly deny it.
  * **Associated with Instances:** 
    * A Security Group is associated with one or more EC2 instances. 
    * An instance can have multiple Security Groups.
  * **Referenced by ID:** 
    * Rules can reference other Security Groups, which is a powerful feature for managing communication between instances within a VPC.

### **Ports**:

  * Ports are a fundamental concept in networking, serving as communication endpoints for applications. 
  * **For example,** web servers commonly use specific ports for different types of traffic. 
    * When you create a Security Group rule, you specify the **Protocol** (e.g., TCP, UDP, ICMP), a **Port Range**, and a **Source/Destination** (IP address, IP range/CIDR block, or another Security Group).

-----

### Common Service Ports

Here is a list of common service ports you'll often encounter when configuring Security Groups, along with their associated services and protocols:

  * **Port 22 (TCP):** 
    * Used for **SSH (Secure Shell)**. 
    * This is essential for securely logging in to Linux EC2 instances to perform administrative tasks. 
    * It's a best practice to restrict access to this port to a specific IP range (e.g., your office network) rather than the entire internet (`0.0.0.0/0`).
  * **Port 3389 (TCP):** 
    * Used for **RDP (Remote Desktop Protocol)** to windows machines. 
    * This is the equivalent of SSH for Windows-based EC2 instances, allowing you to connect to the graphical user interface. 
    * Similar to SSH, restrict this port to a specific, trusted IP address range.
  * **Port 80 (TCP):** 
    * Used for **HTTP (Hypertext Transfer Protocol)**. 
    * This port handles **unencrypted** web traffic. 
    * For public-facing web servers, you'll need to allow inbound traffic on this port from the entire internet `0.0.0.0/0`.
  * **Port 443 (TCP):** 
    * Used for **HTTPS (Hypertext Transfer Protocol Secure)**. 
    * This is the standard port for **encrypted** web traffic. It is crucial for any website that handles sensitive information.
    * Similar to HTTP, for public-facing web servers, you'll need to allow inbound traffic on this port from the entire internet `0.0.0.0/0`.
  * **Port 8080 (TCP):** 
    * A common alternative port for web servers or application servers (e.g., Tomcat) when running multiple services on the same instance.
  * **Port 3306 (TCP):** 
    * Used for **MySQL/Aurora**. 
    * If you have a MySQL database instance, you'll need to allow inbound traffic on this port **from your application server's Security Group**, not the public internet.
  * **Port 5432 (TCP):** 
    * Used for **PostgreSQL**. 
    * Similar to MySQL, this port should be accessible only from the application tier.
  * **Port 27017 (TCP):** 
    * Used for **MongoDB**.
  * **Port 53 (TCP/UDP):** 
    * Used for **DNS (Domain Name System)**. Essential for name resolution.

-----

### Advantages & Drawbacks

**Advantages:**

  * **Simple and effective:** 
    * Provides a strong and easy-to-manage first line of defense.
  * **Stateful:** 
    * Simplifies rule management by automatically handling return traffic.
  * **Granular Control:** 
    * Offers fine-grained control at the instance level.
  * **Referenceable:**  
    * You can reference other Security Groups, which is great for managing a large number of instances and ensures that rules don't need to be updated with every instance IP change.

**Drawbacks:**

  * **Only "Allow" Rules:** 
    * You cannot create rules to explicitly deny specific traffic, like blocking a known malicious IP address. 
    * For this, you would need a Network ACL.
  * **No IP-Level Denial:** 
    * Within an allowed CIDR range, you can't block a single IP.
      * **CIDR stands for Classless Inter-Domain** Routing. 
      * In the context of AWS Security Groups, a CIDR range is a way to specify a block of IP addresses that are either allowed or denied access to your EC2 instances. 
      * It's a more efficient and flexible way to manage IP addresses compared to the old class-based system (Class A, B, C).
  * **Stateful Outbound:** 
    * While stateful ingress is a benefit, it can make it harder to restrict outbound traffic in certain scenarios where you might want to prevent an application from making unauthorized outbound calls.

-----

### Interview Angle

**Possible Questions:**

1.  **"Explain the difference between a Security Group and a Network ACL."**
      * **Answer Strategy:** A strong answer will highlight the core differences: 
        * SGs are **stateful** and operate at the **instance level**, while NACLs (Network ACLs) are **stateless** and operate at the **subnet level**. 
        * Also, mention that SGs only support "allow" rules, while NACLs support both "allow" and "deny."
2.  **"How would you securely configure a three-tier application (web, application, database) using Security Groups?"**
      * **Answer Strategy:** Describe a solution with three separate Security Groups:
          * **Web Tier SG:** 
            * Allows inbound traffic on ports 80 and 443 from `0.0.0.0/0` (the entire internet).
          * **Application Tier SG:** 
            * Allows inbound traffic on a specific port (e.g., 8080) **only from the Web Tier's** Security Group.
          * **Database Tier SG:** 
            * Allows inbound traffic on the database port (e.g., 3306) **only from the Application Tier's** Security Group.
3.  **"What happens if an instance has multiple Security Groups, and they have conflicting rules?"**
      * **Answer Strategy:** Explain that all Security Group rules are **additive**. 
        * AWS evaluates all rules from all associated Security Groups, and if any single rule allows the traffic, it will be permitted. 
        * This means there are no "conflicting" rules in a blocking sense; they are all **effectively "OR'd" together** (even if 1 SG allows it will be allowed).

-----

### For AWS certification exam perspective

  * **Distinguish SG vs. NACL:** 
    * This is a fundamental concept for all associate-level exams. 
    * Memorize the key differences (SG / Network ACL): 
      * **Stateful/Stateless**, 
      * **Instance/Subnet Level**, 
      * **Allow/Allow+Deny**.
  * **Default Behavior:** 
    * Be aware of the default settings: 
      * SGs deny inbound and allow all outbound by default. 
      * The default NACL in a new VPC allows all traffic.
  * **Rule Evaluation:** 
    * Understand that SGs evaluate all rules for a decision, while NACLs process rules in numbered order, **stopping at the first match**. 
    * This is a common test question.
  * **Principle of Least Privilege:** 
    * Exam questions will often present scenarios that test your ability to apply the principle of least privilege. 
    * For instance, you should know that you don't expose a database to the entire internet (`0.0.0.0/0`).
  * **Common Ports:** 
    * Be familiar with the common port numbers for services like SSH, HTTP, HTTPS, RDP, and common databases.

<br/>

A step-by-step video on how to create and manage security groups can be found in this tutorial on [AWS Security Groups Simply Explained](https://www.youtube.com/watch?v=uYDT2SsHImQ).

-----