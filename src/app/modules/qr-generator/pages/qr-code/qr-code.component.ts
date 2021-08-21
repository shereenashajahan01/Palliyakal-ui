import { Component, OnInit, ViewChild } from '@angular/core'
import { NgxUiLoaderService } from 'ngx-ui-loader'
import { ConfirmationService, MessageService } from 'primeng/api'
import { Table } from 'primeng/table'
import { QrCodeService } from '../../services/qr-code.service'

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.scss'],
})
export class QrCodeComponent implements OnInit {
  constructor(
    private qrService: QrCodeService,
    public messageServiceRef: MessageService,
    public confirmationServiceRef: ConfirmationService,
    private ngxLoaderRef: NgxUiLoaderService,
  ) {}
  public farmerList: any[] = []
  public farmerListSelection: any[] = []
  public isUploaded: boolean = false
  public isQrcode: boolean = false
  public selectedCode: any
  public currentCode: any
  public href: string
  public printEnable: boolean = false
  @ViewChild('dt') dt!: Table
  cols: any
  public paginatorConfig: any = {
    rows: 10,
    rowsPerPageOptions: [10, 25, 50],
    showCurrentPageReport: false,
    currentPageReportTemplate:
      'Showing {first} to {last} of {totalRecords} entries',
  }
  public rowSelectionConfig: any = { rowIndex: null, rowData: null }
  private gridEventConfig: any = {}
  ngOnInit(): void {
    this.cols = [
      { field: 'date', header: 'Date' },
      { field: 'shgType', header: 'Shg Type' },
      { field: 'shgArea', header: 'Shg Area' },
      { field: 'product', header: 'Product' },
      { field: 'farmerName', header: 'Farmer Name' },
      { field: 'code', header: 'Code' },
      { field: 'qrCode', header: 'QR' },
    ]
    this.loadFarmerList()
  }
  delete() {
    if (this.farmerList.length !== 0) {
      this.confirmationServiceRef.confirm({
        header: 'Delete Confirmation',
        message: `Do you want to clear data?`,
        icon: 'pi pi-info-circle',
        accept: () => {
          this.ngxLoaderRef.start()
          this.qrService.delete().subscribe(
            (res: any) => {
              if (res) {
                this.ngxLoaderRef.start()
                this.successNotification(res.Response)
                this.loadFarmerList()
              }
            },
            () => {
              this.ngxLoaderRef.stop()
            },
          )
        },
      })
    }
  }
  successNotification(msg) {
    this.messageServiceRef.add({
      severity: 'success',
      summary: 'Success',
      detail: msg,
    })
  }
  fileChangeListener($event: any): void {
    const files = $event.srcElement.files
    let formData = new FormData()
    formData.append('file', files[0])
    this.qrService.uploadFile(formData).subscribe((res: any) => {
      this.successNotification('File uploaded successfully')
      this.isUploaded = true
      this.loadFarmerList()
    })
  }
  loadFarmerList() {
    this.ngxLoaderRef.start()
    this.qrService.getFarmerList().subscribe(
      (response: any) => {
        this.ngxLoaderRef.stop()
        if (response.customerDetails && response.customerDetails) {
          const farmerList = response.customerDetails
          this.farmerList = []
          this.farmerList = [...farmerList]
          this.rowSelectionConfig.rowData = null
          this.rowSelectionConfig.rowIndex = null
        }
      },
      () => {
        this.ngxLoaderRef.stop()
      },
    )
  }
  applyFilterGlobal($event: any, stringVal: any, table: string) {
    this.dt.filterGlobal(($event.target as HTMLInputElement).value, 'contains')
  }
  onRowClick(a, b, c) {}
  generateQR(event) {
    this.ngxLoaderRef.start()
    this.isQrcode = true
    this.currentCode = event.code
    this.selectedCode = `http://localhost:4000/qrCode/${event.code}`
    var self = this
    setTimeout(function () {
      self.getValue(event)
    }, 3000)
  }
  getBase64Data(event) {
    let dataurl = document.getElementById(`${event.code}`).innerHTML
    let myRegexp = /(?:^|\s)src=(.*?)(?:\s|$)/g
    let match = myRegexp.exec(dataurl)
    let match1 = match[1].replace('">', '')
    let match2 = match1.replace('</div>', '')
    let ImageURL = match2.trim()
    return ImageURL
  }
  getValue(event) {
    let ImageURL = this.getBase64Data(event)
    let block = ImageURL.split(';')
    let contentType = block[0].split(':')[1];
    let realData = block[1].split(',')[1];
    let file = this.dataURLtoFile(ImageURL, `testFile${event.farmerName}q.png`)
    if (file) {
      this.uploadQrcode(file, event)
    }
  }
  uploadQrcode(file, event) {
    this.ngxLoaderRef.start()
    let formData = new FormData()
    formData.append('file', file)
    formData.append('code', event.code)
    formData.append('a', `http://palliyakal.herokuapp.com/safetoeatkerala/${event.code}`)
    this.qrService.saveQr(formData).subscribe(
      (res: any) => {
        this.successNotification('QR code generated successfully')
        this.ngxLoaderRef.stop()
        this.printEnable = true
        this.loadFarmerList()
      },
      () => {
        this.ngxLoaderRef.stop()
      },
    )
  }
  dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n)

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
    return new File([u8arr], filename, { type: mime })
  }
  print(event) {
    var myWindow = window.open(
      '',
      'Image',
      'left=0,top=0,width=600,height=400,toolbar=1,scrollbars=1,status=0',
    )
    var tag = `data:image/jpeg;base64,${event.qrCode}`
    var img = `<html><body ><div style="width:50; height:50"><img  src=${tag}><h4>Palliyakal</h4></div></body></html>`
    myWindow.document.write(img)
    myWindow.print()
    myWindow.close()
    event.preventDefault()
  }
  deleteCustomer(event) {
    this.confirmationServiceRef.confirm({
      header: 'Delete Confirmation',
      message: `Do you want to delete this farmer?`,
      icon: 'pi pi-info-circle',
      accept: () => {
        this.ngxLoaderRef.start()
        var payload = {
          farmername: event.farmerName,
          product: event.product,
          shgArea: event.shgArea,
          date: event.date,
        }
        this.qrService.deleteCustomer(payload).subscribe(
          (res: any) => {
            this.ngxLoaderRef.stop()
            if (res) {
              this.successNotification(res.Response)
              this.loadFarmerList()
            }
          },
          () => {
            this.ngxLoaderRef.stop()
          },
        )
      },
    })
  }
}
