import { BootcampService } from './../../../services/bootcamp/bootcamp.service';
import { IInstructorAllModel } from 'src/app/models/instructor/request/InstructorAllModel';
import { IBootcampAllModel } from 'src/app/models/bootcamp/request/BootcampAllModel';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InstructorService } from 'src/app/services/instructor/instructor.service';

@Component({
  selector: 'app-bootcamp-update',
  templateUrl: './bootcamp-update.component.html',
  styleUrls: ['./bootcamp-update.component.css'],
})
export class BootcampUpdateComponent implements OnInit {
  bootcampUpdateForm: FormGroup;
  getBootcamp: IBootcampAllModel;
  instracters: IInstructorAllModel[];

  constructor(
    private bootcampService: BootcampService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private instructorService: InstructorService
  ) {}

  ngOnInit(): void {
    this.getBootcampById();
    this.instructorService.getAllInstructors();
  }

  getBootcampById() {
    this.bootcampService
      .getBootcampById(this.activatedRoute.snapshot.params['id'])
      .subscribe((data) => {
        this.getBootcamp = data;
        this.createUpdateBootcampForm();
      });
  }

  createUpdateBootcampForm() {
    this.bootcampUpdateForm = this.formBuilder.group({
      instructorId: [this.getBootcamp.instructorId, Validators.required],
      name: [this.getBootcamp.name, Validators.required],
      dateStart: [this.getBootcamp.dateStart, Validators.required],
      dateEnd: [this.getBootcamp.dateEnd, Validators.required],
      state: [this.getBootcamp.state, Validators.required],
    });
  }

  updateBootcamp() {
    if (this.bootcampUpdateForm.valid) {
      let bootcampModel = Object.assign({}, this.bootcampUpdateForm.value);
      this.bootcampService.updateBootcamp(this.getBootcamp.id, bootcampModel);
    }
  }

  deleteBootcamp(id: number) {
    this.bootcampService.deleteBootcamp(id);
  }
}
