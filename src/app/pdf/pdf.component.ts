import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.css'],
})
export class PDFComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  venda = this.data
  ngOnInit(): void {
    console.log(this.venda)
    console.log(this.data);
  }


  convertToPdf() {
    const element = document.getElementById('PDFs');
    if (element) {
      html2canvas(element).then(canvas => {
        let pdf = new jsPDF('p', 'pt', [canvas.width, canvas.height]);
        var width = pdf.internal.pageSize.width;
        var height = canvas.height * (width / canvas.width);
        pdf.addImage(canvas, 'PNG', 0, 0, width, height);
        // pdf.save('test.pdf');
        var options = {
          filename: 'comprovante-de-venda.pdf',
        }
        pdf.output('dataurlnewwindow');
      });
    }
  }
}
