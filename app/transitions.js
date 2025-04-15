export default function () {
    this.transition(
      this.fromRoute(''),
      this.toRoute('addEmployee'),
      this.use('toLeft'),
      this.reverse('toRight'),
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