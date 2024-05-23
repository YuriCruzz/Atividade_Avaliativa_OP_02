abstract class Item {
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

    getDescricao(){
        return this.descricao;
    }
}

class ItemInventario{
    private quantidade: number;
    private item: Item;

    constructor(item: Item, quant: number){
        this.quantidade = quant;
        this.item = item;
    }

    getQuantidade(): number{
        return this.quantidade;
    }

    getItem(): Item{
        return this.item;
    }

    setQuant(quant: number){
        this.quantidade = quant;
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
       player.setHP(player.getHP()+(player.getMaxHP()*0.5));
       player.setMP(player.getMP()+(player.getMaxMP()*0.2));
   }

   removerBeneficios(pleyer: Personagem) { }//Não usavel nesta class.
}

class Inventario {
    private itens: ItemInventario[] = [];
    private quantidadeMaxItens: number = 20;

    adicionarItem(item: Item, quantidade: number = 1){
        if(this.itens.length >= this.quantidadeMaxItens){
            throw new InventarioLimiteException('O iventario está cheio. É imposivel levar mais itens de 20!');
        } 
        const itemExistente = this.itens.findIndex((element) => element.getItem() === item);//N**
        if(itemExistente !== -1){
            this.itens[itemExistente].setQuant(quantidade);
        }else{
            this.itens.push(new ItemInventario(item, quantidade));
        }
    }

    getItensIventario(): ItemInventario[]{
        return this.itens;
    }

    getMaxQuantidade(): number{
        return this.quantidadeMaxItens
    }

    getTotalItens(): number {
        return this.itens.reduce((total, item) => total + item.getQuantidade(), 0);
    } //N**
}

class InventarioLimiteException extends Error {
    constructor(message: string) {
        super(message);
        this.name = "InventarioLimiteException";
    }
}

class ItemMenu {
    private opcao: string;
    private textoOpcao: string;

    constructor(indice: string, opao: string){
        this.opcao = indice;
        this.textoOpcao = opao;
    }

    getOpcao(): string{
        return this.opcao;
    }
    getTextoOpcao(): string{
        return this.textoOpcao;
    }
}

class Menu {
    private itens: ItemMenu[]=[];

    constructor(){
        this.itens.push(new ItemMenu ("1", "Equipar Arma."))
        this.itens.push(new ItemMenu ("2", "Tomar Poção."))
        this.itens.push(new ItemMenu ("3", "Adicionar Arma ao Inventário."))
        this.itens.push(new ItemMenu ("4", "Adicionar Poção ao Inventário."))
        this.itens.push(new ItemMenu ("5", "Imprimir Info."))
        this.itens.push(new ItemMenu ("6", "Desequipar Arma."))
        this.itens.push(new ItemMenu ("0", "Sair."))
    }

    imprimirMenu(){
        console.log("Escolha uma das opções abaixo:");
        this.itens.forEach(item => {
            console.log(`${item.getOpcao}. ${item.getTextoOpcao}`);
        })

        let entrada = require('prompt-sync')();
        let escolha = entrada('Selecione uma das Opções Exibido no Console: ');

        return escolha;
    }

    getItensDeMenu(): ItemMenu[]{
        return this.itens;
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

    constructor(n: string, hp: number, mp: number, f: number, d: number, inventario: Inventario, arma: Arma) {
        this.nome = n;
        this.hp = hp;
        this.mp = mp;
        this.forca = f;
        this.defesa = d;
        this.inventario = inventario;
        this.arma = arma;
        

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
        console.log(`${this.inventario.getTotalItens()}/${this.inventario.getMaxQuantidade}`);
    }

    usarItem(item: Item){
        if (item instanceof Arma) {
            if (this.arma) {
                this.arma.removerBeneficios(this);
            }
            this.arma = item;
            this.arma.aplicarBeneficios(this);
        } else if (item instanceof Pocao) {
            item.aplicarBeneficios(this);

            for (let i = 0; i < this.inventario.getItensIventario().length; i++) {
                if (this.inventario.getItensIventario()[i].getItem().getNome() == item.getNome()) {
                    this.inventario.getItensIventario()[i].setQuant(this.inventario.getItensIventario()[i].getQuantidade() - 1);
                }
            }
        }
    }

    desequiparArma() {
        if (this.arma) {
            this.arma.removerBeneficios(this);
        } else {
            console.log("O personagem não está equipado com uma arma.");
        }
    }

    exibirPerssonagem(){
        console.log(`Informações do Perssomagem:\n
        HP: ${this.hp}\n
        MP: ${this.mp}\n
        Ataque: ${this.forca}\n
        Defesa: ${this.defesa}\n
        Arma: ${this.arma}`);
    }

    getArma(): Arma{
        return this.arma;
    }

    getForca(): number{
        return this.forca;
    }

    getDefesa(): number{
        return this.defesa;
    }

    getHP(): number{
        return this.hp;
    }

    getMP(): number{
        return this.mp;
    }

    getMaxHP(): number{
        return this.maxhp;
    }

    getMaxMP(): number{
        return this.maxmp;
    }
    getIventario(): Inventario{
        return this.inventario;
    }

    setForca(forca: number){
        this.forca = forca;
    }

    setDefesa(defesa: number){
        this.defesa = defesa;
    }

    setHP(hp: number){
        this.hp = hp;
    }
    setMP(mp: number){
        this.mp = mp;
    }
}

class Jogo {
    private menu: Menu;
    private perssonagem: Personagem;

    constructor() {
        this.menu = new Menu();
        this.perssonagem = new Personagem('Silas', 200, 500, 400, 150, new Inventario(), new Arma('Orbe do Infinito', 'Uma esfera translúcida, qual possui a representação do espo o preenchendo.'));
    }

    listArmas(){
        this.perssonagem.getIventario().getItensIventario().forEach(item => {
            let i = 1;
            if(item instanceof Arma){
                console.log(`${i}. ${item}.`);
                i++
            }
    });

        let entrada = require('prompt-sync')();
        let escolha = entrada('\nEscreva o nome da Arma a ser equipada: ');

        this.perssonagem.getIventario().getItensIventario().forEach(itemInventario => {
            if(itemInventario.getItem().getNome() === escolha){
                this.perssonagem.usarItem(itemInventario.getItem())
                console.log(`${escolha} foi equipado!`);
            }
        });
    }

    listPocao(){
        this.perssonagem.getIventario().getItensIventario().forEach(item => {
            let i = 1;
            if(item instanceof Pocao){
                console.log(`${i}. ${item}.`);
                i++
            }
        });

        let entrada = require('prompt-sync')();
        let escolha = entrada('\nEscreva o nome da Poção a ser usada: ');

        this.perssonagem.getIventario().getItensIventario().forEach(itemInventario => {
            if(itemInventario.getItem().getNome() === escolha){
                this.perssonagem.usarItem(itemInventario.getItem())
                console.log(`${escolha} foi usada!`);
            }
        });
    }

    addArma(){
        let entrada = require('prompt-sync')();
        let nomeArma = entrada('\nEscreva o nome da Arma: ');
        let descArma = entrada('\nEscreva a descrição da Arma: ');

        let arma = new Arma(nomeArma, descArma);
        let itemIventario = new ItemInventario(arma, 1);

        this.perssonagem.getIventario().getItensIventario().push(itemIventario);
    }
    addPocao(){
        let entrada = require('prompt-sync')();
        let nomePocao = entrada('\nEscreva o nome da Poção: ');
        let descPocao = entrada('\nEscreva a descrição da Poção: ');

        let pocao = new Pocao(nomePocao, descPocao);
        let itemIventario = new ItemInventario(pocao, 1);

        this.perssonagem.getIventario().getItensIventario().push(itemIventario);
    }

    jogar(){
        let opcao = this.menu.imprimirMenu();
        do{
            switch (opcao) {
                case '1':
                    this.listArmas();
                    break;
                case '2':
                    this.listPocao();
                    break;
                case '3':
                    this.addArma();
                    break;
                case '4':
                    this.addPocao
                    break;
                case '5':
                    this.perssonagem.exibirPerssonagem();
                    break;
                case '6':
                    this.perssonagem.desequiparArma();
                    console.log('Arma desequipada!');
                    break;
                case '0':
                    console.log('Cessão Incerrada.');
                    break;
                default:
                    console.log('Opção não valida.');
            }

        }while(this.perssonagem.getHP() > 0);
    }
}

let jogo = new Jogo();
jogo.jogar();