import { Component, OnInit } from '@angular/core';
import {SelectItem} from 'primeng/api';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {Router} from '@angular/router'
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})


export class FormularioComponent implements OnInit {

  enumeracao: SelectItem[];
  mask = '';
  form: FormGroup;
  defaultFields: {};
  edit;
  submitted = false;
  perecivel = false;

  constructor(private fb: FormBuilder,  private router: Router) {
    this.enumeracao = [
      {label:'Litro', value: 'lt'},
      {label:'Quilograma', value: 'kg'},
      {label:'Unidade', value: 'un'},  
    ];

    this.defaultFields = {
      nome: '',
      unidade: 'lt',
      quantidade: '',
      preco: '',
      perecivel: false,
      validade: null,
      fabricacao: null
    };

    this.edit = localStorage.getItem('toEdit');
    
    if (this.edit) {
      this.defaultFields = JSON.parse(localStorage.getItem('itens'))[this.edit];
      //Convert tipo date
      this.defaultFields.validade = new Date(this.defaultFields.validade);
      this.defaultFields.fabricacao = new Date(this.defaultFields.fabricacao);
      //Converte perecivel
      this.defaultFields.perecivel = this.defaultFields.perecivel == 'Perecível';
      this.perecivel = this.defaultFields.perecivel;
      //Converte unidade
      if (this.defaultFields.unidade == 'un') {          
        this.mask = '999';
      } else {
        this.mask = '999,999';
      }      
    } else {
      this.mask = '999,999';
    }
  }

  ngOnInit() {

    this.form = this.fb.group({
      nome: [this.defaultFields.nome, [Validators.required, Validators.maxLength(50), Validators.pattern('^[a-zA-Z \-\']+')]],
      unidade:  [this.defaultFields.unidade],
      quantidade:  [this.defaultFields.quantidade],
      preco:  [this.defaultFields.preco, [Validators.required]],
      perecivel:  [this.defaultFields.perecivel],
      validade:  [this.defaultFields.validade],
      fabricacao:  [this.defaultFields.fabricacao, [Validators.required]]
    })

    let addonUnidade = document.getElementById('addon-unidade');
    addonUnidade.innerHTML = this.defaultFields.unidade;
  }
  
  //Alteração de mascara
  campoUnidade(event) {
    let addonUnidade = document.getElementById('addon-unidade');
    addonUnidade.innerHTML = event.value;
    if (event.value == 'un') {
      console.log('oi');
      this.mask = '9999';
    } else {
      this.mask = '999,999';
    }
  }

  //Validação de data de Validade
  campoDataValidade() {
    let value = this.form.value.validade,
        today = new Date();

    if (value && value < today) {
      document.getElementById('vencido').innerHTML = 'Item Vencido';
    } else {
      document.getElementById('vencido').innerHTML = '';
    }

    let toReturn = false;
    if (this.perecivel) {
      if (value) {
        toReturn = true;
      } 
    } else {
      toReturn = true;
    }
    return toReturn;
  }

  //Validação de data de fabricação
  campoDataFabricacao() {
    let validade = this.form.value.validade,
        fabricacao = this.form.value.fabricacao;

    if (this.perecivel && validade < fabricacao) {
      return false;
    } else {
      return true;
    }
  }
  
  //Validação de erros
  hasError(field: string) {
    return this.form.get(field).errors;
  }

  //Evento change input perecivel
  onChangePerecivel(val) {
    this.perecivel = val.checked;
  }

  //Submit do formulário
  onSubmit(event) {
    this.submitted = true;

    if (this.form.valid && this.campoDataValidade() && this.campoDataFabricacao()) {
      let newItem = this.form.value,
          itens = JSON.parse(localStorage.getItem('itens'));

      if (itens == null) {
        itens = [];
      }

      if (newItem.perecivel) {
        newItem.perecivel = 'Perecível';
      } else {
        newItem.perecivel = 'Não perecível';
      };

      switch (newItem.unidade) {
        case 'lt':
          newItem.unidadeDescricao = 'Litro';
          break 
        case 'kg': 
          newItem.unidadeDescricao = 'Quilograma';
          break 
        case 'un':
          newItem.unidadeDescricao = 'Unidade';
          break
      }

      if (this.edit){
        itens[this.edit] = newItem;
      } else {
        itens.push(newItem);
      }

      localStorage.setItem('itens', JSON.stringify(itens));

      //Mensagem de sucesso
      if (this.edit){
        localStorage.setItem('msg', 'Item editado com sucesso!');
      } else {
        localStorage.setItem('msg', 'Item incluido com sucesso!');
      }

      this.router.navigate(['/lista']);

    }
  }

  //Evento cancelar
  onCancel(event) {
    this.router.navigate(['/lista']); 
  }
}

