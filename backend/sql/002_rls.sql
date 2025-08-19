ALTER TABLE public.chats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.current_x_hasura_user_id() RETURNS uuid AS $$
  SELECT NULLIF(current_setting('hasura.user', true), '')::uuid;
$$ LANGUAGE sql STABLE;

CREATE POLICY chats_select_own ON public.chats
  FOR SELECT USING (user_id = public.current_x_hasura_user_id());

CREATE POLICY chats_insert_own ON public.chats
  FOR INSERT WITH CHECK (user_id = public.current_x_hasura_user_id());

CREATE POLICY chats_update_own ON public.chats
  FOR UPDATE USING (user_id = public.current_x_hasura_user_id());

CREATE POLICY chats_delete_own ON public.chats
  FOR DELETE USING (user_id = public.current_x_hasura_user_id());

CREATE POLICY messages_select_own ON public.messages
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.chats c WHERE c.id = messages.chat_id AND c.user_id = public.current_x_hasura_user_id())
  );

CREATE POLICY messages_insert_own ON public.messages
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.chats c WHERE c.id = messages.chat_id AND c.user_id = public.current_x_hasura_user_id())
  );
