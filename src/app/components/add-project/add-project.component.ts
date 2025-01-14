import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from 'src/app/services/dialog.service';
import { OrganizationService } from 'src/app/services/organization.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent {

  projectForm=this._fb.group({
    "projectName":["projectName"],
    "projectStartDate":['2024-11-01'],
    "projectEndDate":['2024-11-11'],
    "projectDescription":["projectDescription"]
  });

  constructor(private _fb:FormBuilder, private _projectService:ProjectService,
    private _dialogService:DialogService, private _organizationService:OrganizationService,
    private _router:Router
  ){
    
  }

  addProject() {
    if(this.projectForm.valid){
      let projectDetails={
        "projectName":this.projectForm.value.projectName,
        "projectStartDate":this.projectForm.value.projectStartDate,
        "projectEndDate":this.projectForm.value.projectEndDate,
        "projectDescription":this.projectForm.value.projectDescription
      }

      this._organizationService.getOrganizationSomeDetails(localStorage.getItem('token')).subscribe((res)=>{
        projectDetails['organization']=res
        console.log(projectDetails)
        this._projectService.addProject(projectDetails).subscribe(res1=>{
          console.log(res1);
          if(res1=='error'){
            this._dialogService.showFailed('Failed','Project name already exists!!!')
          }else{
            this._dialogService.showSuccess('Success','Project added successfully')
            this._router.navigateByUrl(`org/${res.orgUsername}/project/all-projects`)
          }
        })
      })
    }else{

    }
  }

}
