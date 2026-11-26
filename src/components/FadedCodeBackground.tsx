import React from 'react';
import { ThemeMode } from '../types/portfolio';

interface FadedCodeBackgroundProps {
  theme: ThemeMode;
}

export const FadedCodeBackground: React.FC<FadedCodeBackgroundProps> = ({ theme }) => {
  const isDark = theme === 'dark';

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 w-full h-full overflow-hidden select-none"
      style={{
        maskImage: 'radial-gradient(ellipse 95% 85% at 50% 35%, black 30%, transparent 92%)',
        WebkitMaskImage: 'radial-gradient(ellipse 95% 85% at 50% 35%, black 30%, transparent 92%)',
      }}
    >
      {/* Subtle Full-Width Code Grid Background */}
      <div
        className={`w-full h-full font-mono text-[11px] sm:text-[12px] leading-[22px] tracking-tight p-6 sm:p-12 overflow-hidden transition-opacity duration-500 ${
          isDark
            ? 'opacity-[0.038] text-[#9297A1]'
            : 'opacity-[0.025] text-[#0B0D10]'
        }`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 sm:gap-16">
          {/* Column 1: TypeScript API & State Machine */}
          <div className="space-y-1">
            <p className="text-[#1E90FF]">/** Midusa Core Commerce State Engine */</p>
            <p>import &#123; PrismaClient &#125; from &apos;@prisma/client&apos;;</p>
            <p>import &#123; DarajaClient, StkPushOptions &#125; from &apos;@daraja/core&apos;;</p>
            <p className="pt-2">export interface OrderTransaction &#123;</p>
            <p className="pl-4">id: string;</p>
            <p className="pl-4">checkoutRequestId: string;</p>
            <p className="pl-4">merchantRequestId: string;</p>
            <p className="pl-4">amount: number;</p>
            <p className="pl-4">phone: string;</p>
            <p className="pl-4">status: &apos;PENDING&apos; | &apos;VERIFIED&apos; | &apos;FAILED&apos;;</p>
            <p className="pl-4">createdAt: Date;</p>
            <p>&#125;</p>
            <p className="pt-2">export async function initiateCheckout(payload: StkPushOptions) &#123;</p>
            <p className="pl-4">const timestamp = formatTimestamp(new Date());</p>
            <p className="pl-4">const password = generateBase64Password(timestamp);</p>
            <p className="pl-4">const response = await daraja.lipaNaMpesaOnline(&#123;</p>
            <p className="pl-8">BusinessShortCode: process.env.DARAJA_SHORTCODE,</p>
            <p className="pl-8">Password: password,</p>
            <p className="pl-8">Timestamp: timestamp,</p>
            <p className="pl-8">TransactionType: &apos;CustomerPayBillOnline&apos;,</p>
            <p className="pl-8">Amount: payload.amount,</p>
            <p className="pl-8">PartyA: payload.phone,</p>
            <p className="pl-8">PartyB: process.env.DARAJA_SHORTCODE,</p>
            <p className="pl-8">PhoneNumber: payload.phone,</p>
            <p className="pl-8">CallBackURL: process.env.DARAJA_CALLBACK_URL,</p>
            <p className="pl-8">AccountReference: payload.reference,</p>
            <p className="pl-8">TransactionDesc: `Ebook_${&#123;payload.ebookId&#125;}`</p>
            <p className="pl-4">&#125;);</p>
            <p className="pl-4">return response.data;</p>
            <p>&#125;</p>
          </div>

          {/* Column 2: PostgreSQL / Prisma Schema & Relational Models */}
          <div className="hidden md:block space-y-1">
            <p className="text-[#1E90FF]">/** Prisma Relational Schema */</p>
            <p>datasource db &#123;</p>
            <p className="pl-4">provider = &quot;postgresql&quot;</p>
            <p className="pl-4">url = env(&quot;DATABASE_URL&quot;)</p>
            <p>&#125;</p>
            <p className="pt-2">model Ebook &#123;</p>
            <p className="pl-4">id String @id @default(uuid())</p>
            <p className="pl-4">title String</p>
            <p className="pl-4">slug String @unique</p>
            <p className="pl-4">author String</p>
            <p className="pl-4">price Decimal @db.Decimal(10, 2)</p>
            <p className="pl-4">storageKey String</p>
            <p className="pl-4">orders Order[]</p>
            <p>&#125;</p>
            <p className="pt-2">model Order &#123;</p>
            <p className="pl-4">id String @id @default(uuid())</p>
            <p className="pl-4">status OrderStatus @default(PENDING)</p>
            <p className="pl-4">ebook Ebook @relation(fields: [ebookId], references: [id])</p>
            <p className="pl-4">ebookId String</p>
            <p className="pl-4">transaction PaymentTransaction?</p>
            <p className="pl-4">createdAt DateTime @default(now())</p>
            <p>&#125;</p>
            <p className="pt-2">enum OrderStatus &#123;</p>
            <p className="pl-4">PENDING</p>
            <p className="pl-4">VERIFIED</p>
            <p className="pl-4">FAILED</p>
            <p>&#125;</p>
          </div>

          {/* Column 3: React 19 Frontend Hook & Architecture */}
          <div className="hidden lg:block space-y-1">
            <p className="text-[#1E90FF]">/** Client State Machine Hook */</p>
            <p>export function useMpesaPayment() &#123;</p>
            <p className="pl-4">const [state, setState] = useState&lt;CheckoutState&gt;(&apos;idle&apos;);</p>
            <p className="pl-4">const [pollCount, setPollCount] = useState(0);</p>
            <p className="pt-2 pl-4">const executePayment = async (phone: string, ebookId: string) =&gt; &#123;</p>
            <p className="pl-8">setState(&apos;initiating&apos;);</p>
            <p className="pl-8">const &#123; checkoutRequestId &#125; = await api.post(&apos;/checkout/stk&apos;, &#123; phone, ebookId &#125;);</p>
            <p className="pl-8">setState(&apos;awaiting_pin&apos;);</p>
            <p className="pl-8">pollOrderStatus(checkoutRequestId);</p>
            <p className="pl-4">&#125;;</p>
            <p className="pt-2 pl-4">const pollOrderStatus = (requestId: string) =&gt; &#123;</p>
            <p className="pl-8">const interval = setInterval(async () =&gt; &#123;</p>
            <p className="pl-12">const status = await api.get(`/orders/status/$&#123;requestId&#125;`);</p>
            <p className="pl-12">if (status.verified) &#123;</p>
            <p className="pl-16">clearInterval(interval);</p>
            <p className="pl-16">setState(&apos;completed&apos;);</p>
            <p className="pl-12">&#125;</p>
            <p className="pl-8">&#125;, 3000);</p>
            <p className="pl-4">&#125;;</p>
            <p className="pl-4">return &#123; state, executePayment &#125;;</p>
            <p>&#125;</p>
          </div>
        </div>
      </div>
    </div>
  );
};
