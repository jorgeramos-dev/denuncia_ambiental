<!DOCTYPE html>
<html lang="pt-br">
    <head>
        <meta charset="UTF-8">
        <title>IMA Denúncia - Consultar Denúncia</title>

        <!-- Carrega SCSS da página -->
        <link href="<?php echo base_url();?>assets/mapa/consultar.scss" rel="stylesheet">
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
                            <a href="<?php echo base_url('denuncia/consultar') ?>" >Consultar</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="contact_us_6">
            <div class="responsive-container-block container">

                <div class="responsive-cell-block wk-desk-7 wk-ipadp-12 wk-tab-12 wk-mobile-12" id="i772w">
                    <div class="map-part">
                        <p class="text-blk map-contactus-head" id="w-c-s-fc_p-1-dm-id">
                            BUSCAR DENÚNCIA
                        </p>
                        <p class="text-blk map-contactus-subhead">
                            Por favor, insira o token que você recebeu por e-mail para consultar o status da sua denúncia.
                        </p>

                        <div class="social-media-links mob">
                            <input type="text" id="search-input" placeholder="Digite o token aqui" />
                        </div>

                        <div class="tabela">
                            <table id="denuncia-table" class="hidden">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Data</th>
                                        <th>Tipo</th>
                                        <th>Status</th>
                                        <th>Data Evento</th>
                                        <th>Descrição</th>
                                    </tr>
                                </thead>
                                <tbody id="denuncia-table-body">
                                    <!-- As linhas serão adicionadas dinamicamente aqui -->
                                </tbody>
                            </table>
                        </div>
    
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Carregar Controlador JS via CDN -->
        <!-- <script src="assets/js/mapa/consultar.js"></script> -->
        <script src="<?php echo base_url('assets/js/mapa/consultar.js'); ?>"></script>

        <script>
            const baseURL = "<?php echo base_url(); ?>";
        </script>
        
    </body>
</html>