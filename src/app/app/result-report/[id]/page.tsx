"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { api } from "@/services/fetchClient";
import { Button, Card, Loading } from "@/components/ui";

export default function ResultReportPage() {
  const params = useParams();

  const { data: srData, isLoading: srLoading } = useQuery<any>({
    queryKey: ["my-sr", params.id],
    queryFn: () => api.get(`/api/service-requests/${params.id}`),
  });

  const { data: reportData, isLoading: reportLoading } = useQuery<{ results: { data: any[] }[] }>({
    queryKey: ["myreports", params.id],
    queryFn: () => api.get(`/api/service-requests/${params.id}/answer`),
  });

  if (srLoading || reportLoading) return <Loading fullScreen />;

  const result = reportData?.results?.map((i: any) => i.data)[0];
  const roles = result?.map((i: any) => ({ role_id: i.role_id, role_name: i.role_name }));

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="no-print sticky top-0 z-30 bg-surface/80 backdrop-blur-xl border-b border-border px-6 py-3 flex items-center justify-between">
        <h1 className="text-lg font-bold text-foreground">گزارش نتیجه</h1>
        <div className="flex items-center gap-3">
          <Button variant="primary" onClick={handlePrint} icon={
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
          }>
            چاپ
          </Button>
        </div>
      </div>

      <div className="p-6 max-w-[1220px] mx-auto">
        <Card className="print:shadow-none print:border-0">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-black text-foreground">گزارش نتیجه</h2>
            <p className="text-muted-foreground mt-2">
              شناسه درخواست: {params.id}
            </p>
          </div>

          {roles && roles.length > 0 ? (
            <div className="space-y-6">
              {roles.map((role: any) => (
                <div key={role.role_id}>
                  <h3 className="text-lg font-bold text-foreground mb-3 pb-2 border-b border-border">
                    {role.role_name}
                  </h3>
                  <div className="space-y-2">
                    {result
                      ?.filter((r: any) => r.role_id === role.role_id)
                      .map((item: any, idx: number) => (
                        <div key={idx} className="flex items-start gap-2 text-sm">
                          <span className="text-muted-foreground">{item.question}:</span>
                          <span className="font-medium text-foreground">{item.answer}</span>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-8">
              هنوز گزارشی ثبت نشده است
            </p>
          )}
        </Card>
      </div>
    </div>
  );
}
