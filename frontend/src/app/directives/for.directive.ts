import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[myFor]'
})

export class ForDirective implements OnInit {

  @Input('myForEm') textos: string[] = [];

  constructor(private container: ViewContainerRef, private template: TemplateRef<any>) {

  }

  ngOnInit(): void {
    for (let texto of this.textos) {
      this.container.createEmbeddedView(this.template, { $implicit: texto })
    }
  }
}
