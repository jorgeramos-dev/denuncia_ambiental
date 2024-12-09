<!DOCTYPE html>
<html lang="pt-br">
    <head>
        <meta charset="UTF-8">
        <title>IMA Denúcia</title>

        <!-- Carregar CSS e Biblioteca JavaScript do Leaflet -->
        <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
        <!-- Carrega SCSS da página -->
        <link href="<?php echo base_url();?>assets/mapa/mapa.scss" rel="stylesheet">
    </head>
    <body>

        <div class="wrapper">
            <div class="top_navbar">
                <div class="top_menu">
                    <div class="navbar-brand js-scroll-trigger">
                        LOGO
                    </div>

                    <ul>
                        <li>
                            <a href="<?php echo base_url('denuncia') ?>">Denunciar</a>
                        </li>
                        <li>
                            <a href="<?php echo base_url('denuncia/consultar') ?>">Consultar</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="contact_us_6">
            <div class="responsive-container-block container">
                <form class="form-box">
                    <div class="container-block form-wrapper">

                        <div class="responsive-container-block" id="i2cbk">
                            
                            <div class="responsive-cell-block wk-tab-12 wk-mobile-12 wk-desk-12 wk-ipadp-12" id="i10mt-3">
                                <p class="text-blk input-title">
                                PONTO DE REFERÊNCIA *
                                </p>
                                <input class="input" id="ponto_referencia" name="ponto_referencia" placeholder="Como podemos encontrar o local?">
                            </div>
                            <div class="responsive-cell-block wk-tab-12 wk-mobile-12 wk-desk-12 wk-ipadp-12" id="ip1yp">
                                <p class="text-blk input-title">
                                TIPO DE DENÚNCIA *
                                </p>
                                <select class="input" id="id_natureza" name="id_natureza">
                                    <option value="0">Selecione um tipo de denúncia</option>
                                    <option value="1">Poluição</option>
                                    <option value="2">Fauna</option>
                                    <option value="3">Flora</option>
                                    <option value="4">Contra Ordenamento Urbano</option>
                                    <option value="5">Administração Ambiental</option>
                                    <option value="6">Administração Ambiental-contra Ordenamento Urbano</option>
                                    <option value="7">Administração Ambiental - Fauna</option>
                                    <option value="8">Administração Ambiental - Flora</option>
                                    <option value="9">Administração Ambiental - Poluição</option>
                                    <option value="10">Contra Ordenamento Urbano - Fauna</option>
                                    <option value="11">Contra Ordenamento Urbano - Flora</option>
                                    <option value="12">Contra Ordenamento Urbano - Poluição</option>
                                    <option value="13">Fauna - Flora</option>
                                    <option value="14">Fauna - Poluição</option>
                                    <option value="15">Flora - Poluição</option>
                                    <option value="16">Recursos Minerais</option>
                                </select>
                            </div>
                            <div class="responsive-cell-block wk-tab-12 wk-mobile-12 wk-desk-12 wk-ipadp-12">
                                <p class="text-blk input-title">
                                    ANEXOS (ATÉ 4)
                                </p>

                                <input class="input" type="file" id="imagens" multiple />
                            </div>
                            <div class="responsive-cell-block wk-tab-12 wk-mobile-12 wk-desk-12 wk-ipadp-12" id="i634i-3">
                                <p class="text-blk input-title">
                                DESCRIÇÃO DA DENÚNCIA *
                                </p>
                                <textarea class="textinput" id="descricao" maxlength="100" rows="5" placeholder="Descreva brevemente o problema encontrado para que possamos verificar o local..."></textarea>
                            </div>
                            <div class="responsive-cell-block wk-tab-12 wk-mobile-12 wk-desk-12 wk-ipadp-12" id="i10mt-3">
                                <p class="text-blk input-title">
                                E-MAIL
                                </p>
                                <input class="input" type="email" id="email" name="email" placeholder="E-mail para acompanhar ...">
                            </div>
                        </div>
                        <button class="submit-btn" id="enviar-denuncia" type="button">
                            Enviar
                        </button>
                    </div>
                </form>
                <div class="responsive-cell-block wk-desk-7 wk-ipadp-12 wk-tab-12 wk-mobile-12" id="i772w">
                    <div class="map-part">
                        <p class="text-blk map-contactus-head" id="w-c-s-fc_p-1-dm-id">
                            DENÚNCIA
                        </p>
                        <p class="text-blk map-contactus-subhead">
                            Sua denúncia é totalmente anônima e irá nos ajudar a cuidar melhor do nosso meio ambiente. <br>
                            Ajude a proteger o meio ambiente em Santa Catarina. Faça sua denúncia de forma rápida e fácil.
                        </p>
                        <div class="social-media-links mob">
                            <input type="text" id="search-input" placeholder="Exemplo: Felipe Schmidt, Florianopolis..." />
                            <ul id="search-results" class="search-results"></ul>
                        </div>
                        
                        </div>
                            <div class="map-box container-block" id="map">
                        </div>
                        <span class="resultado"  id="endereco"></span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Carregar Biblioteca Leaflet JS via CDN -->
        <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
        
        <!-- Carregar Controlador JS via CDN -->
        <script src="assets/js/mapa/mapa.js"></script>

        <script>
            const baseURL = "<?php echo base_url(); ?>";
        </script>
        
    </body>
</html>