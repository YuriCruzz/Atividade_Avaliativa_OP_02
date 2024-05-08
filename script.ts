class Item {
    protected nome: string;
    protected descricao: string;

    constructor(n: string, d: string){
        this.nome = n;
        this.descricao = d;
    }

    aplicarBeneficios(){
        
    }

    removerBeneficios(){
        
    }
}

class ItemInventario{
    private quantidade: number;
    private item: Item;
}

class Arma extends Item {

}

class Pocao extends Item {
    
}

class Inventario {
    private itemInventario: ItemInventario[] = [];
    private quantidadeMaxItens: number;

    adicionarItem(){

    }
}

class ItemMenu {
    textoOpcao: string;
}

class Personagem {
    nome: string;
    hp: number;
    mp: number;
    forca: number;
    defesa: number;
    inventario: Inventario;
    arma: Arma;

    constructor(parameters) {
        
    }

    abrirIventario(){

    }

    usarItem(){
        
    }
}