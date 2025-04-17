export default function () {
    this.transition(
      this.fromRoute(''),
      this.toRoute('addEmployee'),
      this.use('toDown'),
      this.reverse('toUp'),
    );

    this.transition(
        this.fromRoute(''),
        this.toRoute('editEmployee'),
        this.use('toRight'),
        this.reverse('toLeft'),
      );
      this.transition(
        this.childOf('#liquid-bind-demo'), 
        this.use('toUp')
    );
  }