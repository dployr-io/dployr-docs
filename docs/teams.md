---
title: Teams and Role-Based Access Control
description: Invite teammates to your dployr cluster and control what they can do with role-based access control. Roles include Owner, Admin, Member, and Guest.
---

# Teams and RBAC

Your cluster has a team. Everyone on the team can access the dashboard and perform actions based on their role. This page covers inviting people, assigning roles, and what each role can do.

## Inviting teammates

From the dashboard, go to **Settings > Team** and click **Invite**. Enter their email address and choose a role. They'll receive an invitation by email and land in your cluster the first time they accept it.

## Roles

There are four roles. Each one is a subset of the one above it.

**Owner**: full control. Can do everything, including billing, cluster deletion, and managing other owners. There must always be at least one owner. When you create an account, you're the owner.

**Admin**: can do everything except billing and cluster-level destructive actions. Can invite and remove team members, manage RBAC, and deploy anything.

**Member**: the default role for people doing day-to-day work. Can deploy services, manage environment variables, view logs, and restart services. Can't manage team members or touch billing.

**Guest**: read-only access. Can view services, logs, and metrics but can't make any changes. Good for stakeholders, contractors, or anyone who needs visibility without the ability to affect anything.

## Events log

Every action taken in your cluster is recorded: deployments, restarts, environment variable changes, user logins, invitations. The events log is in the dashboard under **Events**. You can filter by action type and time window.

In a team, the events log answers the question of who did what and when.

## Removing a teammate

From **Settings > Team**, find the team member and click **Remove**. They lose access to the cluster immediately. Their past actions remain in the events log.

## Transferring ownership

To transfer ownership, promote another user to Owner first, then remove your own Owner role. If you've lost access, contact support.
