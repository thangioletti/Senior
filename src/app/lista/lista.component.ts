import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router'


@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css'],
  providers: [MessageService]
})

export class ListaComponent implements OnInit {

  itens: [];

  constructor(private messageService: MessageService, private router: Router) {
  }

  ngOnInit() {
    this.itens = JSON.parse(localStorage.getItem('itens'));
    let i;
    for (i in this.itens) {
      let dataValidade = new Date(this.itens[i].validade),
          today = new Date();
      if (dataValidade < today) {
        this.itens[i].vencido = 'Item vencido';
      }
    }
    this.displayMsg();
    localStorage.removeItem('toEdit');
  }

  //Dispara mensagem de sucessos
  showMsg(msg) {
    this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: msg });
  }

  //Método que controla mensagens.
  displayMsg() {
    let msg = localStorage.getItem('msg');
    let that = this;
    if (msg) {
      setTimeout(function () {
        that.showMsg(msg);
      }, 100);
      localStorage.removeItem('msg');
    }
  }

  //Evento botão editar
  onEdit(i) {
    localStorage.setItem('toEdit', i);
    this.router.navigate(['/formulario']);
  }

  //Evento botão deletar
  onDelete(i) {
    localStorage.setItem('toDelete', i);
    this.messageService.clear();
    this.messageService.add({ key: 'c', sticky: true, severity: 'error', summary: 'Você tem certeza?', detail: 'Confirme para excluir' });
  }

  //Evento botão confirmar deletar
  onConfirm() {
    let toDelete = localStorage.getItem('toDelete'),
      itens = JSON.parse(localStorage.getItem('itens'));

    itens.splice(toDelete, 1);
    localStorage.setItem('itens', JSON.stringify(itens));
    localStorage.removeItem('toDelete');
    localStorage.setItem('msg', 'Item exclído com sucesso!');
    this.ngOnInit();
    this.messageService.clear();
  }
  
  //Evento botão rejeitar deletar
  onReject() {
    localStorage.removeItem('toDelete');    
    this.messageService.clear();
  }
}
