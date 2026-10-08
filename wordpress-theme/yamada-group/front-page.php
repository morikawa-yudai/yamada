<?php
/** Generated from the approved Vercel design. */
get_header();
?>
<main>
    <section class="hero hero-city-preview" id="top">
      <div class="hero-media" aria-hidden="true">
        <img class="hero-base-image" src="<?php echo esc_url(yg_image_url('hero_image', yg_asset('images/hero-city-network.webp'))); ?>" alt="" width="1600" height="900" fetchpriority="high" decoding="async">
        <img class="hero-preview-image" src="" alt="" width="1536" height="1024" decoding="async">
      </div>
      <div class="hero-wash"></div>
      <div class="hero-content">
        <p class="hero-intro"><?php echo esc_html(yg_field('hero_intro', '私たちは、物流のその先へ')); ?></p>
        <h1><span><?php echo esc_html(yg_field('hero_title_1', '物流を起点に、')); ?></span><em><?php echo esc_html(yg_field('hero_title_2', '企業の未来をひらく。')); ?></em></h1>
        <p class="hero-lead"><?php echo esc_html(yg_field('hero_lead', '物流・オフィス・デジタル・採用。地域に根ざした実行力で、企業の成長を一気通貫で支えます。')); ?></p>
        <ul class="hero-keywords" aria-label="山田グループの4つの事業領域">
          <li><a href="<?php echo esc_url(home_url('/logistics/')); ?>" data-hero-preview=""><span>物流</span></a></li>
          <li><a href="<?php echo esc_url(home_url('/office/')); ?>" data-hero-preview="<?php echo esc_url(yg_asset('images/company-natural.webp')); ?>"><span>オフィス</span></a></li>
          <li><a href="<?php echo esc_url(home_url('/group/')); ?>" data-hero-preview="<?php echo esc_url(yg_asset('images/group-solution-top.webp')); ?>"><span>デジタル</span></a></li>
          <li><a href="<?php echo esc_url(home_url('/group/#sales-recruit')); ?>" data-hero-preview="<?php echo esc_url(yg_asset('images/group-solution-hero.webp')); ?>"><span>営業・採用</span></a></li>
        </ul>
      </div>
      <a class="scroll-cue" href="#news" aria-label="下へスクロール"><span>SCROLL</span><i></i></a>
    </section>

    <?php get_template_part('template-parts/home/latest-news'); ?>

    <section class="section message" id="message">
      <div class="shell">
        <div class="message-grid">
          <div class="message-copy reveal">
            <p class="section-code">YAMADA / SINCE 1977</p>
            <h2>
              <span class="message-heading-lead">大事にしているのは、</span>
              <span class="message-heading-main">支え続けること。</span>
              <span class="message-heading-main">挑み続けること。</span>
            </h2>
            <p>山田運輸は、荷物を目的地へ届けるだけの会社ではありません。お客様の仕事が止まらないように、現場の一番近くで考え、動き、支え続けてきました。</p>
            <p>物流で培った機動力を、移転・施工・廃棄・人材・ITへ。創業50年の信頼を礎に、地域や働く人の未来につながる新しい挑戦を続けます。</p>
            <a class="text-link" href="<?php echo esc_url(home_url('/company/')); ?>">山田運輸について <span>→</span></a>
          </div>
          <figure class="message-photo reveal">
            <img src="<?php echo esc_url(yg_asset('images/company-natural.webp')); ?>" alt="物流拠点で仕事の打ち合わせをするスタッフ" width="1536" height="1024" loading="lazy">
            <figcaption>LOGISTICS × PEOPLE × FUTURE</figcaption>
          </figure>
        </div>
      </div>
    </section>

    <section class="section initiatives" id="initiatives">
      <div class="shell">
        <header class="section-heading reveal">
          <p class="section-code">OUR ACTION</p>
          <h2>地域と、人と、企業のために。</h2>
          <p>運ぶ会社だからこそ、つなげられるものがある。山田運輸は事業の枠を越えて、未来につながる取り組みを進めています。</p>
        </header>

        <div class="initiative-pair">
          <article class="initiative compact reveal">
            <div class="compact-number">01</div>
            <p class="initiative-en">LOGISTICS</p>
            <h3>50年の現場力で、物流を止めない。</h3>
            <p>定期配送・スポット配送・倉庫保管から、首都圏の多様な輸送ニーズまで。グループ100名の体制と50台の保有車両で支えます。</p>
            <a class="text-link" href="<?php echo esc_url(home_url('/logistics/')); ?>">物流事業を見る <span>→</span></a>
          </article>
          <article class="initiative compact accent reveal">
            <div class="compact-number">02</div>
            <p class="initiative-en">OFFICE SOLUTION</p>
            <h3>オフィスの困りごとを、窓口ひとつで。</h3>
            <p>移転・家具・レイアウト・施工・廃棄から、業務アウトソーシングまで、企業活動をまるごと支えます。</p>
            <a class="text-link" href="https://www.office-marutto.com/" target="_blank" rel="noopener noreferrer">まるっとシリーズを見る <span>↗</span></a>
          </article>
        </div>

        <article class="initiative feature reveal">
          <div class="initiative-image">
            <img src="<?php echo esc_url(yg_asset('images/tokyo-headquarters-entrance.webp')); ?>" alt="YAMADA GROUP東京本社のエントランス" width="1254" height="1254" loading="lazy">
          </div>
          <div class="initiative-body">
            <p class="initiative-en">GROUP SOLUTION</p>
            <h3>企業の課題を、グループの力で解決する。</h3>
            <p>事務機・オフィスレイアウトから、Web制作・採用支援・SNS・営業支援まで。グループ各社の専門力を組み合わせ、企業の成長を一気通貫で支えます。</p>
            <a class="text-link" href="https://b-dot.jp/" target="_blank" rel="noopener noreferrer">株式会社B.のサイトを見る <span>↗</span></a>
          </div>
        </article>
      </div>
    </section>

    <section class="section business" id="business">
      <div class="shell">
        <div class="business-intro reveal">
          <div>
            <p class="section-code">SERVICE</p>
            <h2>運ぶ力から生まれた、3つの事業領域。</h2>
          </div>
          <p>現場を知っているから、机上の提案で終わらない。物流を軸に、企業の課題をワンストップで解決します。</p>
        </div>

        <div class="service-list">
          <a class="service-row reveal" href="<?php echo esc_url(home_url('/logistics/')); ?>">
            <div class="service-title">
              <small>LOGISTICS</small>
              <h3>物流事業</h3>
            </div>
            <p>定期配送、スポット配送、倉庫保管、配送請負、まるっと便、首都圏配送</p>
            <span class="service-arrow">→</span>
          </a>
          <a class="service-row reveal" href="<?php echo esc_url(home_url('/office/')); ?>">
            <div class="service-title">
              <small>OFFICE SOLUTION</small>
              <h3>オフィスソリューション</h3>
            </div>
            <p>移転、家具、レイアウト、業務アウトソーシング、施工、処分、買取、原状回復</p>
            <span class="service-arrow">→</span>
          </a>
          <a class="service-row reveal" href="<?php echo esc_url(home_url('/group/')); ?>">
            <div class="service-title">
              <small>GROUP SOLUTION</small>
              <h3>グループソリューション</h3>
            </div>
            <p>事務機、オフィスレイアウト、HP制作、求人運用、SNS、MEO、営業支援</p>
            <span class="service-arrow">→</span>
          </a>
        </div>
      </div>
    </section>


    <section class="section works-gateway" aria-labelledby="works-gateway-title">
      <div class="shell">
        <a class="works-gateway-card reveal" href="https://www.office-marutto.com/" target="_blank" rel="noopener noreferrer">
          <figure class="works-gateway-image">
            <img src="<?php echo esc_url(yg_asset('images/office-installation-works.webp')); ?>" alt="オフィス家具の搬入・組立とレイアウト確認を行う施工スタッフ" width="1536" height="1024" loading="lazy">
            <figcaption>OFFICE PROJECTS / MARUTTO BIN</figcaption>
          </figure>
          <div class="works-gateway-copy">
            <p class="section-code">WORKS / OFFICE SOLUTION</p>
            <h2 id="works-gateway-title">現場で積み重ねた、<br>移転と施工の実績。</h2>
            <p>オフィス移転、家具の搬入・設置、レイアウト変更、原状回復まで。まるっと便の施工事例をご覧いただけます。</p>
            <span class="works-gateway-link">施工実績はこちら <i>↗</i></span>
          </div>
        </a>
      </div>
    </section>

    <section class="section company group-snapshot" id="company">
      <div class="shell">
        <div class="group-snapshot-head reveal">
          <div>
            <p class="section-code">YAMADA GROUP / SCALE</p>
            <h2>数字で見る、<br>YAMADA GROUP。</h2>
          </div>
          <p>物流を起点に、オフィスと企業支援へ。3つの拠点とグループの力で、現場の課題に向き合います。</p>
        </div>
        <div class="group-snapshot-grid reveal">
          <div class="group-snapshot-item"><small>PEOPLE</small><strong><?php echo esc_html(yg_option('employees', '100')); ?><em>名</em></strong><span>グループ従業員</span><i>2026年10月現在</i></div>
          <div class="group-snapshot-item"><small>VEHICLES</small><strong><?php echo esc_html(yg_option('vehicles', '50')); ?><em>台</em></strong><span>保有車両</span><i>2026年10月現在</i></div>
          <div class="group-snapshot-item"><small>CLIENTS</small><strong><?php echo esc_html(yg_option('clients', '500')); ?><em>社+</em></strong><span>取引企業実績</span><i>グループ累計</i></div>
        </div>
        <div class="group-bases reveal">
          <div>
            <small>3 BASES</small>
            <div class="group-base-list"><span><?php echo esc_html(yg_option('tokyo_name', '東京本社')); ?></span><span><?php echo esc_html(yg_option('saitama_name', '埼玉本社')); ?>（<?php echo esc_html(yg_option('saitama_note', '春日部支店')); ?>）</span><span><?php echo esc_html(yg_option('ibaraki_name', '茨城支店')); ?></span></div>
          </div>
          <a class="text-link" href="<?php echo esc_url(home_url('/company/')); ?>">会社情報を見る <span>→</span></a>
        </div>
      </div>
    </section>

    <?php get_template_part('template-parts/home/news-list'); ?>

    <section class="recruit recruit-stories" id="recruit">
      <div class="shell recruit-stories-head reveal">
        <div>
          <p class="section-code">RECRUIT / PEOPLE AT WORK</p>
          <h2>仕事の風景が、<br>いちばんの会社案内。</h2>
        </div>
        <p>運ぶ人、空間をつくる人、チームを支える人。山田グループで働く人の姿から、仕事の空気を感じてください。</p>
      </div>
      <div class="recruit-marquee" aria-label="山田グループで働く人たち">
        <div class="recruit-marquee-track">
          <figure><img src="<?php echo esc_url(yg_asset('images/recruit-driver.webp')); ?>" alt="荷物を固定するドライバー" width="1280" height="853" loading="lazy"><figcaption><small>LOGISTICS</small><span>安全を積み重ねる。</span></figcaption></figure>
          <figure><img src="<?php echo esc_url(yg_asset('images/recruit-office.webp')); ?>" alt="オフィス家具を設置するスタッフ" width="1280" height="853" loading="lazy"><figcaption><small>OFFICE</small><span>働く場所をつくる。</span></figcaption></figure>
          <figure><img src="<?php echo esc_url(yg_asset('images/recruit-team.webp')); ?>" alt="物流拠点で打ち合わせるスタッフ" width="1280" height="853" loading="lazy"><figcaption><small>TEAM</small><span>仲間と現場を動かす。</span></figcaption></figure>
          <figure aria-hidden="true"><img src="<?php echo esc_url(yg_asset('images/recruit-driver.webp')); ?>" alt="" width="1280" height="853" loading="lazy"><figcaption><small>LOGISTICS</small><span>安全を積み重ねる。</span></figcaption></figure>
          <figure aria-hidden="true"><img src="<?php echo esc_url(yg_asset('images/recruit-office.webp')); ?>" alt="" width="1280" height="853" loading="lazy"><figcaption><small>OFFICE</small><span>働く場所をつくる。</span></figcaption></figure>
          <figure aria-hidden="true"><img src="<?php echo esc_url(yg_asset('images/recruit-team.webp')); ?>" alt="" width="1280" height="853" loading="lazy"><figcaption><small>TEAM</small><span>仲間と現場を動かす。</span></figcaption></figure>
        </div>
      </div>
      <div class="shell recruit-stories-foot reveal">
        <p>募集職種・給与・勤務時間などの詳しい条件は、採用情報ページでご案内しています。</p>
        <a class="light-button" href="<?php echo esc_url(home_url('/recruit/')); ?>">採用情報を見る <span>→</span></a>
      </div>
    </section>

    <section class="contact" id="contact">
      <div class="shell contact-inner reveal">
        <p class="section-code">CONTACT</p>
        <h2>運ぶことも、オフィスのことも。まずは山田運輸へ。</h2>
        <p>配送・倉庫・移転・施工・廃棄・人材・ITまで、まとめてご相談いただけます。</p>
        <div class="contact-actions">
          <a class="contact-mail" href="<?php echo esc_url(home_url('/contact/')); ?>">お問い合わせフォームへ <span>→</span></a>
          <a class="contact-tel" href="tel:0488789116"><small>TEL</small>&nbsp;048&#8209;878&#8209;9116&nbsp;<em>平日&nbsp;8:00〜18:00</em></a>
        </div>
      </div>
    </section>
  </main>
<?php get_footer(); ?>
