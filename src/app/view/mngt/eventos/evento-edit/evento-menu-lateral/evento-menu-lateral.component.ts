import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TdMediaService } from '@covalent/core';
import { Certificado } from '../../../../../domain/certificado';
import { CertificadoService } from '../../../../../service/certificado.service';

@Component({
  selector: 'evento-menu-lateral',
  templateUrl: './evento-menu-lateral.component.html',
  styleUrls: ['./evento-menu-lateral.component.scss']
})
export class EventoMenuLateralComponent implements OnInit {

  id: number;

  certificado: Certificado = new Certificado();

  pagina: any = "novo";

  constructor(
    public media: TdMediaService,
    private router: Router,
    private route: ActivatedRoute,
    private certificadoService: CertificadoService,
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.processaCertificado();
  }

  processaCertificado() {
    return this.certificadoService.getCertificadoByEvento(this.id)
      .subscribe(certificado => {
        this.certificadoService.certificado = certificado;
        this.certificado = this.certificadoService.certificado;
        if(this.certificado.id) {
          this.pagina = this.certificado.id;
        }
        
      })
  }
}
