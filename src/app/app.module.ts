import { BrowserModule                     } from '@angular/platform-browser';
import { NgModule                          } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { AppRoutingModule                  } from './app-routing.module';
import { AppComponent                      } from './app.component';
import { BrowserAnimationsModule           } from '@angular/platform-browser/animations';
import { MatInputModule                    } from '@angular/material/input';
import { NgBusyModule                      } from 'ng-busy';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    MatInputModule,
    BrowserAnimationsModule,
    NgBusyModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
