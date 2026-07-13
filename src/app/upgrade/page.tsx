import { MessageCircle, ArrowUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

const WHATSAPP_NUMBER1 = "9647806969277";
const WHATSAPP_NUMBER2 = "9647710639740";
const WHATSAPP_NUMBER3 = "9647710916019";

function formartWhatsAppNumber(number: string): string {
  let formattedNumber = "";
  for (let i = 0; i < number.length; i++) {
    if (i === 3 || i === 6 || i === 9) {
      formattedNumber += " ";
    }
    formattedNumber += number[i];
  }
  return formattedNumber;
}

export default function UpgradePage(): React.ReactElement {
  return (
    <div
      dir="rtl"
      className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans"
    >
      <Card className="max-w-md w-full text-center">
        <CardContent className="flex flex-col items-center gap-6 py-8">
          <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-emerald-100">
            <MessageCircle className="size-8 text-emerald-600" />
          </div>

          <div className="space-y-2">
            <CardTitle className="text-xl font-bold text-slate-900">
              ترقية الباقة
            </CardTitle>
            <CardDescription className="text-slate-500 leading-relaxed">
              للترقية إلى باقة أعلى او تجديد، يرجى التواصل معنا عبر واتساب 
            </CardDescription>
          </div>

          <Button size="lg" className="gap-2 " asChild>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER1}`}
              target="_blank"
              rel="noopener noreferrer"
              dir="ltr"
            >
            {formartWhatsAppNumber(WHATSAPP_NUMBER1)}
              <ArrowUp className="size-4 rotate-45" />
            </a>
          </Button>
          <Button size="lg" className="gap-2 " asChild>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER2}`}
              target="_blank"
              rel="noopener noreferrer"
              dir="ltr"
            >
            {formartWhatsAppNumber(WHATSAPP_NUMBER2)}
              <ArrowUp className="size-4 rotate-45" />
            </a>
          </Button>
          <Button size="lg" className="gap-2 " asChild>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER3}`}
              target="_blank"
              rel="noopener noreferrer"
              dir="ltr"
            >
            {formartWhatsAppNumber(WHATSAPP_NUMBER3)}
              <ArrowUp className="size-4 rotate-45" />
            </a>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
