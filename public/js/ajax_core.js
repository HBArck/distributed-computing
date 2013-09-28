/**
 * Ajacx-Core
 * Date: 28.09.13
 */

var env_ip = { 'local':'/gettask',
    'remote':'http://www.distributed-computing.herokuapp.com/gettask',
    'resp':'/setresult'};

$(document).ready(function(){

    /** Returns astask template
     * @method getTemlate
     * @param o {Object} data from server with current task
     * */
    var getTemplate = function(o)
    {
        var parsed = JSON.parse(o)[0];
        var number = parsed.ind;
        var result_template = parsed.realization.replace(/{ind}/g,number);
        $("#calculations")[0].text = result_template;
        var result = getResult();
    };


    $("body> .destribut-message").click(function(){

        $.ajax({
            url: env_ip['local'],
            type:'GET',
            async:true,
            beforeSend: function( xhr ) {
                xhr.overrideMimeType( "text/plain; charset=x-user-defined" );
               // xhr.overrideMimeType();
            }
        })
            .done(function( data ) {
                if ( console && console.log ) {
                    console.log( "Sample of data:", data.slice( 0, 100 ) );
                }

                $.ajax({
                    url: env_ip['resp'],
                    type:'POST',
                    async:true,
                    data : getTemplate(data),
                    beforeSend: function( xhr ) {
                        xhr.overrideMimeType( "text/plain; charset=x-user-defined" );
                        // xhr.overrideMimeType();
                    }
                })

            });
    });

});
