import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public organisation = [{id: 1, image:"https://www.dynamique-mag.com/wp-content/uploads/e96669f09c136d4598a04830d9874ad5-780x405.jpg" ,name: "Services A", desp: "We are the best. we are the best",num : " 71818188118" },
  {id: 2, image:"https://www.dynamique-mag.com/wp-content/uploads/e96669f09c136d4598a04830d9874ad5-780x405.jpg " ,name: "Services B", desp: "We are the best. we are the best", num : " 71818188118" },
  {id: 3, image:"https://www.dynamique-mag.com/wp-content/uploads/e96669f09c136d4598a04830d9874ad5-780x405.jpg " ,name: "Services C", desp: "We are the best. we are the best",  num : " 71818188118" },
  {id: 4, image:"https://www.dynamique-mag.com/wp-content/uploads/e96669f09c136d4598a04830d9874ad5-780x405.jpg " ,name: "Services D", desp: "We are the best. we are the best", num : " 71818188118" }]
  constructor() { }

  ngOnInit(): void {
    
  }

}
