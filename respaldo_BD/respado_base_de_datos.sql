PGDMP         1                {            test_td    15.1    15.1 /    ,           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            -           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            .           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            /           1262    57475    test_td    DATABASE     z   CREATE DATABASE test_td WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Chile.1252';
    DROP DATABASE test_td;
                postgres    false            �            1259    57486 
   categorias    TABLE     g   CREATE TABLE public.categorias (
    id integer NOT NULL,
    nombre character varying(50) NOT NULL
);
    DROP TABLE public.categorias;
       public         heap    postgres    false            �            1259    57485    categorias_id_seq    SEQUENCE     �   CREATE SEQUENCE public.categorias_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.categorias_id_seq;
       public          postgres    false    217            0           0    0    categorias_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.categorias_id_seq OWNED BY public.categorias.id;
          public          postgres    false    216            �            1259    65687    comentarios    TABLE     �   CREATE TABLE public.comentarios (
    id integer NOT NULL,
    contenido text NOT NULL,
    fecha_creacion date NOT NULL,
    entrada_id integer NOT NULL,
    usuario_id integer NOT NULL
);
    DROP TABLE public.comentarios;
       public         heap    postgres    false            �            1259    65686    comentarios_id_seq    SEQUENCE     �   CREATE SEQUENCE public.comentarios_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.comentarios_id_seq;
       public          postgres    false    221            1           0    0    comentarios_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.comentarios_id_seq OWNED BY public.comentarios.id;
          public          postgres    false    220            �            1259    65668    entradas    TABLE     u  CREATE TABLE public.entradas (
    id integer NOT NULL,
    titulo character varying(50) NOT NULL,
    cuerpo text NOT NULL,
    autor character varying(50) NOT NULL,
    imagen_entrada character varying(100) NOT NULL,
    imagen_autor character varying(100) NOT NULL,
    fecha_creacion date NOT NULL,
    categoria_id integer NOT NULL,
    usuario_id integer NOT NULL
);
    DROP TABLE public.entradas;
       public         heap    postgres    false            �            1259    65667    entradas_id_seq    SEQUENCE     �   CREATE SEQUENCE public.entradas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.entradas_id_seq;
       public          postgres    false    219            2           0    0    entradas_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.entradas_id_seq OWNED BY public.entradas.id;
          public          postgres    false    218            �            1259    65706 
   reacciones    TABLE     �   CREATE TABLE public.reacciones (
    id integer NOT NULL,
    reaccion text NOT NULL,
    fecha_creacion date NOT NULL,
    entrada_id integer NOT NULL,
    usuario_id integer NOT NULL
);
    DROP TABLE public.reacciones;
       public         heap    postgres    false            �            1259    65705    reacciones_id_seq    SEQUENCE     �   CREATE SEQUENCE public.reacciones_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.reacciones_id_seq;
       public          postgres    false    223            3           0    0    reacciones_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.reacciones_id_seq OWNED BY public.reacciones.id;
          public          postgres    false    222            �            1259    57477    usuarios    TABLE     d  CREATE TABLE public.usuarios (
    id integer NOT NULL,
    nombre character varying(50) NOT NULL,
    apellido character varying(50) NOT NULL,
    email character varying(50) NOT NULL,
    fecha_nacimiento date NOT NULL,
    genero character varying(20) NOT NULL,
    avatar character varying(50) NOT NULL,
    password character varying(200) NOT NULL
);
    DROP TABLE public.usuarios;
       public         heap    postgres    false            �            1259    57476    usuarios_id_seq    SEQUENCE     �   CREATE SEQUENCE public.usuarios_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.usuarios_id_seq;
       public          postgres    false    215            4           0    0    usuarios_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.usuarios_id_seq OWNED BY public.usuarios.id;
          public          postgres    false    214            z           2604    57489    categorias id    DEFAULT     n   ALTER TABLE ONLY public.categorias ALTER COLUMN id SET DEFAULT nextval('public.categorias_id_seq'::regclass);
 <   ALTER TABLE public.categorias ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    217    216    217            |           2604    65690    comentarios id    DEFAULT     p   ALTER TABLE ONLY public.comentarios ALTER COLUMN id SET DEFAULT nextval('public.comentarios_id_seq'::regclass);
 =   ALTER TABLE public.comentarios ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    221    220    221            {           2604    65671    entradas id    DEFAULT     j   ALTER TABLE ONLY public.entradas ALTER COLUMN id SET DEFAULT nextval('public.entradas_id_seq'::regclass);
 :   ALTER TABLE public.entradas ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    218    219    219            }           2604    65709    reacciones id    DEFAULT     n   ALTER TABLE ONLY public.reacciones ALTER COLUMN id SET DEFAULT nextval('public.reacciones_id_seq'::regclass);
 <   ALTER TABLE public.reacciones ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    222    223    223            y           2604    57480    usuarios id    DEFAULT     j   ALTER TABLE ONLY public.usuarios ALTER COLUMN id SET DEFAULT nextval('public.usuarios_id_seq'::regclass);
 :   ALTER TABLE public.usuarios ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    215    214    215            #          0    57486 
   categorias 
   TABLE DATA           0   COPY public.categorias (id, nombre) FROM stdin;
    public          postgres    false    217   27       '          0    65687    comentarios 
   TABLE DATA           \   COPY public.comentarios (id, contenido, fecha_creacion, entrada_id, usuario_id) FROM stdin;
    public          postgres    false    221   ^7       %          0    65668    entradas 
   TABLE DATA           �   COPY public.entradas (id, titulo, cuerpo, autor, imagen_entrada, imagen_autor, fecha_creacion, categoria_id, usuario_id) FROM stdin;
    public          postgres    false    219   �7       )          0    65706 
   reacciones 
   TABLE DATA           Z   COPY public.reacciones (id, reaccion, fecha_creacion, entrada_id, usuario_id) FROM stdin;
    public          postgres    false    223   Y>       !          0    57477    usuarios 
   TABLE DATA           k   COPY public.usuarios (id, nombre, apellido, email, fecha_nacimiento, genero, avatar, password) FROM stdin;
    public          postgres    false    215   �>       5           0    0    categorias_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.categorias_id_seq', 2, true);
          public          postgres    false    216            6           0    0    comentarios_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.comentarios_id_seq', 5, true);
          public          postgres    false    220            7           0    0    entradas_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.entradas_id_seq', 9, true);
          public          postgres    false    218            8           0    0    reacciones_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.reacciones_id_seq', 17, true);
          public          postgres    false    222            9           0    0    usuarios_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.usuarios_id_seq', 13, true);
          public          postgres    false    214            �           2606    57493     categorias categorias_nombre_key 
   CONSTRAINT     ]   ALTER TABLE ONLY public.categorias
    ADD CONSTRAINT categorias_nombre_key UNIQUE (nombre);
 J   ALTER TABLE ONLY public.categorias DROP CONSTRAINT categorias_nombre_key;
       public            postgres    false    217            �           2606    57491    categorias categorias_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.categorias
    ADD CONSTRAINT categorias_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.categorias DROP CONSTRAINT categorias_pkey;
       public            postgres    false    217            �           2606    65694    comentarios comentarios_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.comentarios
    ADD CONSTRAINT comentarios_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.comentarios DROP CONSTRAINT comentarios_pkey;
       public            postgres    false    221            �           2606    65675    entradas entradas_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.entradas
    ADD CONSTRAINT entradas_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.entradas DROP CONSTRAINT entradas_pkey;
       public            postgres    false    219            �           2606    65713    reacciones reacciones_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.reacciones
    ADD CONSTRAINT reacciones_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.reacciones DROP CONSTRAINT reacciones_pkey;
       public            postgres    false    223                       2606    57484    usuarios usuarios_email_key 
   CONSTRAINT     W   ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_email_key UNIQUE (email);
 E   ALTER TABLE ONLY public.usuarios DROP CONSTRAINT usuarios_email_key;
       public            postgres    false    215            �           2606    57482    usuarios usuarios_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.usuarios DROP CONSTRAINT usuarios_pkey;
       public            postgres    false    215            �           2606    65695 '   comentarios comentarios_entrada_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.comentarios
    ADD CONSTRAINT comentarios_entrada_id_fkey FOREIGN KEY (entrada_id) REFERENCES public.entradas(id);
 Q   ALTER TABLE ONLY public.comentarios DROP CONSTRAINT comentarios_entrada_id_fkey;
       public          postgres    false    219    221    3207            �           2606    65700 '   comentarios comentarios_usuario_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.comentarios
    ADD CONSTRAINT comentarios_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id);
 Q   ALTER TABLE ONLY public.comentarios DROP CONSTRAINT comentarios_usuario_id_fkey;
       public          postgres    false    221    3201    215            �           2606    65676 #   entradas entradas_categoria_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.entradas
    ADD CONSTRAINT entradas_categoria_id_fkey FOREIGN KEY (categoria_id) REFERENCES public.categorias(id);
 M   ALTER TABLE ONLY public.entradas DROP CONSTRAINT entradas_categoria_id_fkey;
       public          postgres    false    3205    217    219            �           2606    65681 !   entradas entradas_usuario_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.entradas
    ADD CONSTRAINT entradas_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id);
 K   ALTER TABLE ONLY public.entradas DROP CONSTRAINT entradas_usuario_id_fkey;
       public          postgres    false    215    3201    219            �           2606    65714 %   reacciones reacciones_entrada_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.reacciones
    ADD CONSTRAINT reacciones_entrada_id_fkey FOREIGN KEY (entrada_id) REFERENCES public.entradas(id);
 O   ALTER TABLE ONLY public.reacciones DROP CONSTRAINT reacciones_entrada_id_fkey;
       public          postgres    false    223    219    3207            �           2606    65719 %   reacciones reacciones_usuario_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.reacciones
    ADD CONSTRAINT reacciones_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id);
 O   ALTER TABLE ONLY public.reacciones DROP CONSTRAINT reacciones_usuario_id_fkey;
       public          postgres    false    215    223    3201            #      x�3�,���K��2�,N�1b���� S?      '   O   x�3��9�� � �����X���8�9��83�s��-8���9�3��@�&���%�
9����hfq��qqq D-`      %   �  x��V�nG<S_1�% I�a���-�!��>0`�#��lfvS���#t�����\��H�$�=Kʲ�bH����鮮���������wJ>�N頢%UhUQPA{�'?G���]P%YU�ϩp�6��+��!���]z3�)��]�)�P����Z�3��`��)�y���Ҩc���Ii��ShOmSB���o����Owx�4��V���ڪ��n�W�+�|-�E�J]G�KH=�4�%^;�Z���:רi�G���h���@|^���(�J���W:oi�ֿ��=C���/�"�f����{Ъ��@�%�kTkۦ���b�o iC��ϜX�[e2Jm@�B�f��jN\MpV �8.���8��B�"Z<Fځ�¯��U	v+�א3jmc�y�JW\Fn��E清s��J�L�ᱯ��'0��J�p͈Z�t�^�J�΁��y+�1w���Φ�L�<?{����r�k�V٨o{�<�f�����u��E��]��(V�����d4�F��՛��㝃��ݬ���Kmڇ/?'�+��N���������ju�8�$rD�jB	�p�x���	V�y�k��vg��A�I�?�P�$�PE�=%��|'-��Ţ�V���"�ɡ� �P�'��k�?GC�BT��#v�g���|Q���k�rݡ2�&��ԕ�Ha��s�R�.��`=���H�Y���,�[�?
�[�%�9����*�w���bi���+!p��o���uMϡ1���E*��<���O������������`�~o�;����̈��1Z݆�T|C��W��Dɕ^l�u���e.'E��փ#���@���7`O���0�8W��f	�}�R/n�tԈf�-�O��5P=[�A"�5�
�-bh={�����Z�������0b� }�{�Rk�#5'w��$`2
i�M+b��#!YU�:���Q,�e0s�o��KdjEG��:�O�"��p /Qu�V<����� Gx��7cže�t�ωZ���b�3��d%)TA#�*B�ILh�nA~��?�P�S
�Y�
���بaN�f}Ӟ�TD��.�G���r���_�=�z���N�g���+5;}qr�����)|:��>����"��Mǻ��t�����o�2al�vpY��N�#�I��a�1��o�O���N�I=��Y͝>'r��D�V�`�a��$P	����?y����Иܱ+��_˿3�������m�+-�����Ur�p����2�=$��/68���h��VjƶR�$���.�;�|Pg ZE�<�$��#�6���58�޸h]��*�-R�.3Tn��E��I���	���PLO��G���C/p��D�>ö��f�4�I�b! �>O��{N��b&����~��������&�%��W6&�d�)�O�^�J�g��Qt�@ߠ�9&�2�\)���
�P��b���8�Ԣ�=�^�h\U��J��FN�	W��E�6aO��gGU�*�=W᲍�T=|�G�!�
�%��I���"�:�lW��O*�k�V�'bw����ڤv���ޞ.�!u������;���^�����,�Hs�|/�n�]�6����Mn`��������2��Qh�u���F�h�Y't1�I>��ǃ�t��hkJ���G�{{�ލ'��҃�p��v����hɦ      )   +   x�34����N�4202�50"NNCC.CsΔ�b�R1z\\\ ]bd      !   N  x���Ms�:���st&�v�
��h[�;�	y�ʧ�h���t���&�o�9�F�*H�� l�(+v`[�?����9@���Pe�eU�x�HlkZ�%tKZ�H��� G>T�>���MG*4R(���]K7Y�5��K6fuŕ�;��*��&(`ߒ�ʢ#�v`W���dL��D�
�"��� =<ҨL�<��AU�ɩ^o��g_��*>HՀy����(�_	Y�^?����9s}A��j�d��:�p�7C�4$Vc�D�� /�1Nx����Bϲ�i���Y�������ij�.M�q0��^=d7<g5�O����<����x�O��a�������Hy�� ��M��DV�O�6
����G�c��юN��R\�8L�c��rf���t��*# .��V%���T}`�
ꑢ���:�;1�E8�t����i�^k�T
����:/��X�uZ[O�`���Q]����\�� �Qe�39Fj��OՑݐ�R����	�R��N�Sj�X��K��K���,�`�jT@�O)���k��wSn��TD$_!���'��.ZN&��{��i7N���;피���lw�+d������Ho�ld!���m�~�_	4S�X��%0����}������@v�7���g��q�ٹJ�Q袄BG@�gMyM���C����O!ږ�bA��)�u��w\��y'��6��'�mۮf�|�B�.��kP�����&k�	J�$�{�wB�Sͳ���ӻ��D�r}���cEAH�iϺ�Oi%����ߐl��\x,��Y*�S�q�^��VvB�ɛ�59b�9��ۍS�z�<���A��ⷛ     