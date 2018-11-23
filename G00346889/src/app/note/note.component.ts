import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from '../view/view.component';
import { PostService } from '../services/post.service';

/**
 * @title View Notes
 * @desc this component displays the note for a selected task.
 * @note this component reads in note data from 'view.component' it is read in from 
 * importted interface:
 *     - import { DialogData }
 * With the usage of:
 *     - import { MatDialog, MatDialogRef, MAT_DIALOG_DATA }
*/

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<NoteComponent>,
    @Inject(MAT_DIALOG_DATA) public tasksData: DialogData, private ps: PostService) { }

  /**
   * @title Closes NoteComponent dialog.
   * @desc closes the dialog box if clicked outside the box.
   */
  onNoClick(): void {
    this.dialogRef.close();
  }

  /**
   * @title Updates a tasks note.
   * @desc updates a tasks note after a user edits the text box and submits it.
   * it passes the values into the post servers updateNote() to be then put onto the server.
   */
  onUpdate(updatedNote: String) {
    console.log('INSIDE NOTE.TS', this.tasksData.taskId, updatedNote); //SOMETHING WORNG HERE AND DATA NOT UPDADING TO WHAT IS BEING ENTERED

    this.ps.updateNote(this.tasksData.taskId, updatedNote).subscribe(data => {
      this.tasksData = data; // Update tasks data with the new data
      this.dialogRef.close(); //Close the dialog box
      location.reload(true);  //Reload the webpage
    });
  };//End onUpdate() function

  ngOnInit() {
    console.log(this.tasksData);
  }//End function
} // End Class
