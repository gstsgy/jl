// src/types/html2pdf.d.ts
declare module 'html2pdf.js' {
    interface Options {
        margin?: number | number[];
        filename?: string;
        image?: {
            type?: string;
            quality?: number;
        };
        html2canvas?: any;
        jsPDF?: any;
    }

    interface Html2Pdf {
        set(options: Options): Html2Pdf;
        from(element: HTMLElement): Html2Pdf;
        toContainer(): Html2Pdf;
        toCanvas(): Html2Pdf;
        toPdf(): Html2Pdf;
        output(type: string, options?: any): any;
        outputPdf(type: string): any;
        save(filename?: string): Promise<void>;
    }

    function html2pdf(): Html2Pdf;
    export default html2pdf;
}