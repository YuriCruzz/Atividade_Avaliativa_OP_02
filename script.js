var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Item = /** @class */ (function () {
    function Item(n, d) {
        this.nome = n;
        this.descricao = d;
    }
    Item.prototype.getNome = function () {
        return this.nome;
    };
    Item.prototype.getDescricao = function () {
        return this.descricao;
    };
    return Item;
}());
var ItemInventario = /** @class */ (function () {
    function ItemInventario(item, quant) {
        this.quantidade = quant;
        this.item = item;
    }
    ItemInventario.prototype.getQuantidade = function () {
        return this.quantidade;
    };
    ItemInventario.prototype.getItem = function () {
        return this.item;
    };
    ItemInventario.prototype.setQuant = function (quant) {
        this.quantidade = quant;
    };
    return ItemInventario;
}());
var Arma = /** @class */ (function (_super) {
    __extends(Arma, _super);
    function Arma() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Arma.prototype.aplicarBeneficios = function (pleyer) {
        pleyer.setForca(pleyer.getForca() + 10);
        pleyer.setDefesa(pleyer.getDefesa() + 5);
    };
    Arma.prototype.removerBeneficios = function (pleyer) {
        pleyer.setForca(pleyer.getForca() - 10);
        pleyer.setDefesa(pleyer.getDefesa() - 5);
    };
    return Arma;
}(Item));
var Pocao = /** @class */ (function (_super) {
    __extends(Pocao, _super);
    function Pocao() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Pocao.prototype.aplicarBeneficios = function (player) {
        player.setHP(player.getHP() + (player.getMaxHP() * 0.5));
        player.setMP(player.getMP() + (player.getMaxMP() * 0.2));
    };
    Pocao.prototype.removerBeneficios = function (pleyer) { }; //Não usavel nesta class.
    return Pocao;
}(Item));
var Inventario = /** @class */ (function () {
    function Inventario() {
        this.itens = [];
        this.quantidadeMaxItens = 20;
    }
    Inventario.prototype.adicionarItem = function (item, quantidade) {
        if (quantidade === void 0) { quantidade = 1; }
        if (this.itens.length >= this.quantidadeMaxItens) {
            throw new InventarioLimiteException('O iventario está cheio. É imposivel levar mais itens de 20!');
        }
        var itemExistente = this.itens.findIndex(function (element) { return element.getItem() === item; }); //N**
        if (itemExistente !== -1) {
            this.itens[itemExistente].setQuant(quantidade);
        }
        else {
            this.itens.push(new ItemInventario(item, quantidade));
        }
    };
    Inventario.prototype.getItensIventario = function () {
        return this.itens;
    };
    Inventario.prototype.getMaxQuantidade = function () {
        return this.quantidadeMaxItens;
    };
    Inventario.prototype.getTotalItens = function () {
        return this.itens.reduce(function (total, item) { return total + item.getQuantidade(); }, 0);
    }; //N**
    return Inventario;
}());
var InventarioLimiteException = /** @class */ (function (_super) {
    __extends(InventarioLimiteException, _super);
    function InventarioLimiteException(message) {
        var _this = _super.call(this, message) || this;
        _this.name = "InventarioLimiteException";
        return _this;
    }
    return InventarioLimiteException;
}(Error));
var ItemMenu = /** @class */ (function () {
    function ItemMenu(indice, opao) {
        this.opcao = indice;
        this.textoOpcao = opao;
    }
    ItemMenu.prototype.getOpcao = function () {
        return this.opcao;
    };
    ItemMenu.prototype.getTextoOpcao = function () {
        return this.textoOpcao;
    };
    return ItemMenu;
}());
var Menu = /** @class */ (function () {
    function Menu() {
        this.itens.push(new ItemMenu("1", "Equipar Arma."));
        this.itens.push(new ItemMenu("2", "Tomar Poção."));
        this.itens.push(new ItemMenu("3", "Adicionar Arma ao Inventário."));
        this.itens.push(new ItemMenu("4", "Adicionar Poção ao Inventário."));
        this.itens.push(new ItemMenu("5", "Imprimir Info."));
        this.itens.push(new ItemMenu("6", "Desequipar Arma."));
        this.itens.push(new ItemMenu("0", "Sair."));
    }
    Menu.prototype.imprimirMenu = function () {
        console.log("Escolha uma das opções abaixo:");
        this.itens.forEach(function (item) {
            console.log("".concat(item.getOpcao, ". ").concat(item.getTextoOpcao));
        });
        var entrada = require('prompt-sync')();
        var escolha = entrada('Selecione uma das Opções Exibido no Console: ');
        return escolha;
    };
    Menu.prototype.getItensDeMenu = function () {
        return this.itens;
    };
    return Menu;
}());
var Personagem = /** @class */ (function () {
    function Personagem(n, hp, mp, f, d, inventario, arma) {
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
    Personagem.prototype.abrirIventario = function () {
        console.log('Inventario:');
        var i = 1;
        for (var _i = 0, _a = this.inventario.getItensIventario(); _i < _a.length; _i++) {
            var itemInventario = _a[_i];
            console.log("".concat(i, " - ").concat(itemInventario.getItem().getNome(), " (").concat(itemInventario.getQuantidade, ")"));
            i++;
        }
        console.log("".concat(this.inventario.getTotalItens(), "/").concat(this.inventario.getMaxQuantidade));
    };
    Personagem.prototype.usarItem = function (item) {
        if (item instanceof Arma) {
            if (this.arma) {
                this.arma.removerBeneficios(this);
            }
            this.arma = item;
            this.arma.aplicarBeneficios(this);
        }
        else if (item instanceof Pocao) {
            item.aplicarBeneficios(this);
            for (var i = 0; i < this.inventario.getItensIventario().length; i++) {
                if (this.inventario.getItensIventario()[i].getItem().getNome() == item.getNome()) {
                    this.inventario.getItensIventario()[i].setQuant(this.inventario.getItensIventario()[i].getQuantidade() - 1);
                }
            }
        }
    };
    Personagem.prototype.desequiparArma = function () {
        if (this.arma) {
            this.arma.removerBeneficios(this);
        }
        else {
            console.log("O personagem não está equipado com uma arma.");
        }
    };
    Personagem.prototype.exibirPerssonagem = function () {
        console.log("Informa\u00E7\u00F5es do Perssomagem:\n\n        HP: ".concat(this.hp, "\n\n        MP: ").concat(this.mp, "\n\n        Ataque: ").concat(this.forca, "\n\n        Defesa: ").concat(this.defesa, "\n\n        Arma: ").concat(this.arma));
    };
    Personagem.prototype.getArma = function () {
        return this.arma;
    };
    Personagem.prototype.getForca = function () {
        return this.forca;
    };
    Personagem.prototype.getDefesa = function () {
        return this.defesa;
    };
    Personagem.prototype.getHP = function () {
        return this.hp;
    };
    Personagem.prototype.getMP = function () {
        return this.mp;
    };
    Personagem.prototype.getMaxHP = function () {
        return this.maxhp;
    };
    Personagem.prototype.getMaxMP = function () {
        return this.maxmp;
    };
    Personagem.prototype.getIventario = function () {
        return this.inventario;
    };
    Personagem.prototype.setForca = function (forca) {
        this.forca = forca;
    };
    Personagem.prototype.setDefesa = function (defesa) {
        this.defesa = defesa;
    };
    Personagem.prototype.setHP = function (hp) {
        this.hp = hp;
    };
    Personagem.prototype.setMP = function (mp) {
        this.mp = mp;
    };
    return Personagem;
}());
var Jogo = /** @class */ (function () {
    function Jogo() {
        this.menu = new Menu();
        this.perssonagem = new Personagem('Silas', 200, 500, 400, 150, new Inventario(), new Arma('Orbe do Infinito', 'Uma esfera translúcida, qual possui a representação do espo o preenchendo.'));
    }
    Jogo.prototype.listArmas = function () {
        var _this = this;
        this.perssonagem.getIventario().getItensIventario().forEach(function (item) {
            var i = 1;
            if (item instanceof Arma) {
                console.log("".concat(i, ". ").concat(item, "."));
                i++;
            }
        });
        var entrada = require('prompt-sync')();
        var escolha = entrada('\nEscreva o nome da Arma a ser equipada: ');
        this.perssonagem.getIventario().getItensIventario().forEach(function (itemInventario) {
            if (itemInventario.getItem().getNome() === escolha) {
                _this.perssonagem.usarItem(itemInventario.getItem());
                console.log("".concat(escolha, " foi equipado!"));
            }
        });
    };
    Jogo.prototype.listPocao = function () {
        var _this = this;
        this.perssonagem.getIventario().getItensIventario().forEach(function (item) {
            var i = 1;
            if (item instanceof Pocao) {
                console.log("".concat(i, ". ").concat(item, "."));
                i++;
            }
        });
        var entrada = require('prompt-sync')();
        var escolha = entrada('\nEscreva o nome da Poção a ser usada: ');
        this.perssonagem.getIventario().getItensIventario().forEach(function (itemInventario) {
            if (itemInventario.getItem().getNome() === escolha) {
                _this.perssonagem.usarItem(itemInventario.getItem());
                console.log("".concat(escolha, " foi usada!"));
            }
        });
    };
    Jogo.prototype.addArma = function () {
        var entrada = require('prompt-sync')();
        var nomeArma = entrada('\nEscreva o nome da Arma: ');
        var descArma = entrada('\nEscreva a descrição da Arma: ');
        var arma = new Arma(nomeArma, descArma);
        var itemIventario = new ItemInventario(arma, 1);
        this.perssonagem.getIventario().getItensIventario().push(itemIventario);
    };
    Jogo.prototype.addPocao = function () {
        var entrada = require('prompt-sync')();
        var nomePocao = entrada('\nEscreva o nome da Poção: ');
        var descPocao = entrada('\nEscreva a descrição da Poção: ');
        var pocao = new Pocao(nomePocao, descPocao);
        var itemIventario = new ItemInventario(pocao, 1);
        this.perssonagem.getIventario().getItensIventario().push(itemIventario);
    };
    Jogo.prototype.jogar = function () {
        var opcao = this.menu.imprimirMenu();
        do {
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
                    this.addPocao;
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
        } while (this.perssonagem.getHP() > 0);
    };
    return Jogo;
}());
var jogo = new Jogo();
jogo.jogar();
