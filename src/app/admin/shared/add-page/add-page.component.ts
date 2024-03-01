import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../../shared/product.service';
import { Router } from '@angular/router'; // Corrected import
@Component({
  selector: 'app-add-page',
  templateUrl: './add-page.component.html',
  styleUrl: './add-page.component.scss',
})
export class AddPageComponent {
  form!: FormGroup;
  submitted = false;

  constructor(private prodServ: ProductService, private router: Router) {}

  ngOnInit() {
    this.form = new FormGroup({
      photo: new FormControl(null, Validators.required),
      info: new FormControl(null, Validators.required),
      type: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required),
      name: new FormControl(null, Validators.required),
    });
  }

  submit() {
    if (this.form.invalid) return;
    this.submitted = true;
    const product = {
      photo: this.form.value.photo,
      info: this.form.value.info,
      price: this.form.value.price,
      type: this.form.value.type,
      name: this.form.value.name,
      date: new Date(),
    };
    console.log(product);
    this.prodServ.create(product).subscribe((res) => this.form.reset());
    this.submitted = false;
    this.router.navigate(['/']);
  }
}
