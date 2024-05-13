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

    getNome(){
        return this.nome;
    }
}

class ItemInventario{
    private quantidade: number;
    private item: Item;

    getQuantidade(){
        return this.quantidade;
    }

    getItem(){
        return this.item;
    }
}

class Arma extends Item {

}

class Pocao extends Item {
    
}

class Inventario {
    private itemInventario: ItemInventario[] = [];
    private quantidadeMaxItens: number = 20;

    adicionarItem(){

    }

    getItensIventario(){
        return this.itemInventario;
    }

    getMaxQuantidade(){
        return this.quantidadeMaxItens
    }
}

class ItemMenu {
    opcao: string;
    textoOpcao: string;

    constructor(indice: string, opao: string){
        this.opcao = indice;
        this.textoOpcao = opao;
    }
}

class Menu {
    itens: ItemMenu[]=[];

    constructor(){
        this.itens.push(new ItemMenu ("1", "Equipar Arma"))
        this.itens.push(new ItemMenu ("2", "Tomar Poção"))
    }
}

class Personagem {
    private nome: string;
    private hp: number;
    private mp: number;
    private forca: number;
    private defesa: number;
    private inventario: Inventario;
    private arma: Arma;

    constructor(parameters) {
        
    }

    abrirIventario(){
        console.log('Inventario:');
        let i = 1;
        for(const itemInventario of this.inventario.getItensIventario()){
            console.log(`${i} - ${itemInventario.getItem().getNome()} (${itemInventario.getQuantidade})`);
            i++;
        }
        console.log(`$/${this.inventario.getMaxQuantidade}`);
    }

    usarItem(){
        
    }
}