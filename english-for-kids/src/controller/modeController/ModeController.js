import data from '../../data';

class ModeController {
    constructor(view, model) {
        this.view = view;
        this.model = model;
        this.data = data;
    }

    setCategory(id) {
        this.model.createCategory( (this.data.filter( category => category.id === id ))[0] );
    }

    createCards(){
        this.view.drawCards(this.model.category.cards);
    }
}

export default ModeController;