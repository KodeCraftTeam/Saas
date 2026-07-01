import { Business } from "./api";

export type SubscriptionPlan = "Básico" | "Pro" | "Empresa" | "Personalizado";
export type SubscriptionStatus = "ACTIVE" | "SUSPENDED";

export interface MockSubscription {
  plan: SubscriptionPlan;
  status: SubscriptionStatus;
  lastPayment: string;
  nextPayment: string;
}

const PLANS: SubscriptionPlan[] = ["Básico", "Pro", "Empresa"];

/**
 * Deriva una suscripción de demostración a partir del negocio.
 * No hay modelo de suscripción en backend todavía — esto es data de prototipo,
 * determinística por negocio para que list/detail se vean consistentes al navegar.
 */
export function getMockSubscription(business: Business, index: number): MockSubscription {
  const plan = PLANS[index % PLANS.length];
  const created = business.createdAt ? new Date(business.createdAt) : new Date();
  const lastPayment = new Date(created);
  lastPayment.setDate(lastPayment.getDate() + (index % 10));
  const nextPayment = new Date(lastPayment);
  nextPayment.setMonth(nextPayment.getMonth() + 1);

  return {
    plan,
    status: business.status === "INACTIVE" ? "SUSPENDED" : "ACTIVE",
    lastPayment: lastPayment.toISOString(),
    nextPayment: nextPayment.toISOString(),
  };
}
