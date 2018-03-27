
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Section } from '../inteterfaces/section';


@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.css']
})
export class GroupDetailComponent implements OnInit {

  name:string
  routeSubscribe:any;
  sectionRef: AngularFirestoreDocument<Section>
  sectionObservable: Observable<Section>
  constructor(private route: ActivatedRoute, private router: Router, private afs: AngularFirestore) {
  }

  ngOnInit() {
    this.routeSubscribe = this.route.params.subscribe(params => {
       this.name = params['name'];
       this.sectionRef = this.afs.doc<Section>(`/sections/${this.name}`)
       this.sectionObservable = this.sectionRef.valueChanges()

    });
  }
  ngOnDestroy() {
    this.routeSubscribe.unsubscribe();
  }

  backGroupListPage(){
    this.router.navigate(['dashboard', 'manage-std-group'])
  }

}
