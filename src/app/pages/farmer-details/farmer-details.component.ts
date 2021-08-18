import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { NgxUiLoaderService } from 'ngx-ui-loader'
import { MessageService } from 'primeng/api'
import { FarmerDetailsService } from 'src/app/core/services/farmer-details.service'

@Component({
  selector: 'app-farmer-details',
  templateUrl: './farmer-details.component.html',
  styleUrls: ['./farmer-details.component.scss'],
})
export class FarmerDetailsComponent implements OnInit {
  routeSub: any
  id: string = ''
  farmerDetails: any = []
  display: boolean = true
  productList: any = []
  farmerNameList: any = []
  shgAreaList: any = []
  constructor(
    private route: ActivatedRoute,
    private service: FarmerDetailsService,
    public messageServiceRef: MessageService,
    private ngxLoaderRef: NgxUiLoaderService,
  ) {}

  ngOnInit(): void {
    this.display = true
    this.routeSub = this.route.params.subscribe((params) => {
      this.id = params['id']
      this.getFarmerDetails(this.id)
    })
  }
  getFarmerDetails(id) {
    this.ngxLoaderRef.start()
    this.service.getFarmerDetails(id).subscribe(
      (res: any) => {
        if (res) {
          this.ngxLoaderRef.stop()
          this.farmerDetails = res.detailsByCode
          this.farmerDetails.filter((el) => {
            if (this.productList.indexOf(el.product) === -1) {
              this.productList.push(el.product)
            }
            if (this.farmerNameList.indexOf(el.farmerName) === -1) {
              this.farmerNameList.push(el.farmerName)
            }
            if (this.shgAreaList.indexOf(el.shgArea) === -1) {
              this.shgAreaList.push(el.shgArea)
            }
          })
        }
      },
      (err) => {
        console.log(err)
        this.ngxLoaderRef.stop()
        this.messageServiceRef.add({
          severity: 'error',
          summary: 'Success',
          detail: 'Something went Wrong',
        })
      },
    )
  }
  ngOnDestroy() {
    this.routeSub.unsubscribe()
  }
}
