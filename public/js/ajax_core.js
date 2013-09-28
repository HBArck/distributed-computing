/**
 * Ajacx-Core
 * Date: 28.09.13
 */

var env_ip = { 'local':'http://10.10.10.62:5000', 'remote':'http://www.distributed-computing.herokuapp.com/index_old.html'};

$(document).ready(function(){
    $("body> .destribut-message").click(function(){

        $.ajax({
            url: env_ip['remote'],
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
                var template = getTemplate(data),
                    ind = getInd(data);

            });
    });

    /** Returns astask template
     * @method getTemlate
     * @param o {Object} data from server with current task
     * */
    function getTemlate(o)
    {

    }

    /** Returns index for task
     * @method getInd
     * @param o {Object} data from server with current task
     * */
    function getInd(o)
    {

    }
});
