class Item {
    protected nome: string;
    protected descricao: string;

    constructor(n: string, d: string){
        this.nome = n;
        this.descricao = d;
    }

    abstract aplicarBeneficios(pleyer: Personagem);

    abstract removerBeneficios(pleyer: Personagem);

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
    aplicarBeneficios(pleyer: Personagem) {
        pleyer.setForca(pleyer.getForca()+10);
        pleyer.setDefesa(pleyer.getDefesa()+5);
    }

    removerBeneficios(pleyer: Personagem) {
        pleyer.setForca(pleyer.getForca()-10);
        pleyer.setDefesa(pleyer.getDefesa()-5);
    }

}

class Pocao extends Item {
   aplicarBeneficios(player: Personagem) {
       
   }

   removerBeneficios(pleyer: Personagem) {
       
   }
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

    private maxhp: number;
    private maxmp: number;

    constructor(n: string, hp: number, mp: number, f: number, d: number) {
        this.nome = n;
        this.hp = hp;
        this.mp = mp;
        this.forca = f;
        this.defesa = d;

        this.maxhp = hp;
        this.maxmp = mp;
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

    getArma(){
        return this.arma;
    }

    getForca(){
        return this.forca;
    }

    getDefesa(){
        return this.defesa;
    }

    getMaxHP(){
        return this.maxhp;
    }

    getMaxMP(){
        return this.maxmp;
    }

    setForca(forca: number){
        this.forca = forca;
    }

    setDefesa(defesa: number){
        this.defesa = defesa;
    }
}