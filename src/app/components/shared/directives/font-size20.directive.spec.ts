import { FontSize20Directive } from './font-size20.directive';
import { ElementRef, Renderer2 } from '@angular/core';

describe('FontSize20Directive', () => {
  let directive: FontSize20Directive;
  let mockElementRef: ElementRef;
  let mockRenderer: Renderer2;

  beforeEach(() => {
    mockElementRef = { nativeElement: document.createElement('div') } as ElementRef;

    // Crear un mock básico para Renderer2 que solo implemente setStyle
    mockRenderer = jasmine.createSpyObj('Renderer2', ['setStyle']);

    directive = new FontSize20Directive(mockElementRef, mockRenderer);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should call setStyle with correct parameters on initialization', () => {
    expect(mockRenderer.setStyle).toHaveBeenCalledWith(
      mockElementRef.nativeElement,
      'font-size',
      '20px'
    );
  });
});
