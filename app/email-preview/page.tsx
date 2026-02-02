"use client"

import { useState } from "react"
import { CustomerReceiptEmail } from "@/components/emails/customer-receipt"
import { SalesNotificationEmail } from "@/components/emails/sales-notification"
import { Button } from "@/components/ui/button"

export default function EmailPreviewPage() {
    const [view, setView] = useState<"customer" | "sales">("customer")

    const mockData = {
        name: "Juan Pérez",
        email: "juan.perez@cliente.com",
        company: "Tiendas Retail S.A.",
        message: "Hola, me interesa implementar SmartAudits en mis 50 sucursales. ¿Podríamos agendar una demo técnica esta semana?"
    }

    const htmlContent = view === "customer"
        ? CustomerReceiptEmail({ name: mockData.name })
        : SalesNotificationEmail(mockData)

    return (
        <div className="min-h-screen bg-slate-100 p-8">
            <div className="max-w-4xl mx-auto space-y-6">
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-between">
                    <div className="flex gap-2">
                        <Button
                            variant={view === "customer" ? "default" : "outline"}
                            onClick={() => setView("customer")}
                            className={view === "customer" ? "bg-emerald-600 hover:bg-emerald-500" : ""}
                        >
                            Vista Cliente
                        </Button>
                        <Button
                            variant={view === "sales" ? "default" : "outline"}
                            onClick={() => setView("sales")}
                            className={view === "sales" ? "bg-emerald-600 hover:bg-emerald-500" : ""}
                        >
                            Vista Ventas
                        </Button>
                    </div>
                    <p className="text-sm text-slate-500 font-medium italic">
                        Previsualización de Plantilla Premium Sidón
                    </p>
                </div>

                {/* El iframe ayuda a aislar el CSS del correo del resto del sitio */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200 min-h-[700px]">
                    <iframe
                        srcDoc={htmlContent}
                        className="w-full h-[700px] border-none"
                        title="Email Preview"
                    />
                </div>
            </div>
        </div>
    )
}
