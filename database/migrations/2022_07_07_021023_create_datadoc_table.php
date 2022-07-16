<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::connection('pgsql')->create('datadoc', function (Blueprint $table) {
            $table->string('article_id')->primary();
            $table->string('href');
            $table->string('topic');
            $table->dateTime('publish_date');
            $table->string('newspapper');
            $table->string('language');
            $table->string('sapo');
            $table->string('content');
            $table->string('feature_image');
            $table->dataTime('created_date');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('datadoc');
    }
};
