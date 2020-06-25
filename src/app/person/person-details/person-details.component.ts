import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { PersonDetails } from 'src/app/interfaces/person-details';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.component.html',
  styleUrls: ['./person-details.component.css'],
})
export class PersonDetailsComponent implements OnInit {

  @Input() person:PersonDetails;
  id: number;
  biography: string[];
  biography2: string[] = [""];


  constructor(private personService: PersonService, private route: ActivatedRoute, private router: Router, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    let id = + this.route.snapshot.params['id'];
    this.id = id;

    this.personService.getPersonDetailsById(id).subscribe(result => {
      this.person = result;
      let first = this.person.biography.replace(/([\.\!\?])\s*(?=[A-Z])/g, "$1|").split("|");

      // for(let i = 0; i < first.length; i++){
      //   const regex = /(Mrs.\nS)/gm;
      //   const found = first[i].match(regex);

      //   console.log(found);

      //   if(first[i].match("Mrs.\nS")){
      //     console.log("Yep");
      //     first[i].replace(/(Mrs.\nS)/g, "Mrs. S");
      //   }
      // }

      this.biography = first;

    });


  }
}
